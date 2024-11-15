import { CardHeader, Skeleton } from "@mui/material";
interface CardSkeletonProps {
  titleWidth?: string;
  subheaderWidth?: string;
}
export function CardSkeleton({
  titleWidth = "",
  subheaderWidth = "",
}: CardSkeletonProps) {
  return (
    <CardHeader
      title={<Skeleton width={titleWidth} />}
      subheader={<Skeleton width={subheaderWidth} />}
      avatar={<Skeleton width={"40px"} height={"40px"} variant="circular" />}
      sx={{
        zIndex: 1,
      }}
    />
  );
}
