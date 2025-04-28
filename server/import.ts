import fs from 'fs';
import readline from 'readline';
import path from 'path';
import { db } from './db';
import { students, type InsertStudent } from '@shared/schema';
import { eq } from 'drizzle-orm';

async function importData() {
  console.log('Starting data import...');
  
  const filePath = path.resolve(process.cwd(), 'data', 'allresults.jsonl');
  
  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found at ${filePath}`);
    process.exit(1);
  }

  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let totalProcessed = 0;
  let totalInserted = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for await (const line of rl) {
    totalProcessed++;
    
    try {
      // Parse the JSON line
      const record = JSON.parse(line);

      // Transform the record to match our schema
      const studentData: InsertStudent = {
        index_number: record['Index Number'],
        name: record['Name'],
        z_score: record['Z-Score'] !== '-' ? parseFloat(record['Z-Score']) : null,
        district_rank: record['District Rank'] !== '-' ? parseInt(record['District Rank']) : null,
        island_rank: record['Island Rank'] !== '-' ? parseInt(record['Island Rank']) : null,
        nic_number: record['NIC Number'],
        subjects: record['Subjects']
      };

      // Check if record already exists
      const existing = await db.select()
        .from(students)
        .where(eq(students.index_number, studentData.index_number))
        .limit(1);

      if (existing.length > 0) {
        // Update existing record
        await db.update(students)
          .set(studentData)
          .where(eq(students.index_number, studentData.index_number));
        totalSkipped++;
      } else {
        // Insert new record
        await db.insert(students).values(studentData);
        totalInserted++;
      }
      
      // Log progress every 1000 records
      if (totalProcessed % 1000 === 0) {
        console.log(`Processed ${totalProcessed} records (${totalInserted} inserted, ${totalSkipped} skipped, ${totalErrors} errors)`);
      }
    } catch (error) {
      totalErrors++;
      console.error(`Error processing line ${totalProcessed}:`, error);
    }
  }

  console.log(`
Import completed:
- Total processed: ${totalProcessed}
- Successfully inserted: ${totalInserted}
- Skipped (already exists): ${totalSkipped}
- Errors: ${totalErrors}
  `);
}

// Run the import if this script is executed directly
// In ESM, we can check for the main module using import.meta.url
const isMainModule = import.meta.url.endsWith('import.ts');

if (isMainModule) {
  importData()
    .then(() => {
      console.log('Import completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Import failed:', error);
      process.exit(1);
    });
}

export { importData };
