export interface Student {
  index_number: string;
  name: string;
  z_score: number | null;
  district_rank: number | null;
  island_rank: number | null;
  nic_number: string | null;
  subjects: Record<string, string> | null;
}
