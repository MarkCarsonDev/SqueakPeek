import { CardHeader, Skeleton } from "@mui/material";
interface CardSkeletonProps {
  titleWidth?: string;
  subheaderWidth?: string;
}

/**
 * Renders the loading state of the CardHeader MUI component
 */
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
