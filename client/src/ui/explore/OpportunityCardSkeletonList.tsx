import { OpportunityCardSkeleton } from "./OpportunityCardSkeleton";
export function OpportunityCardSkeletonList() {
  return [1, 2, 3].map((val) => <OpportunityCardSkeleton key={val} />);
}
