import {
  Card,
  Skeleton,
  CardHeader,
  CardContent,
  IconButton,
} from "@mui/material";
export function OpportunityCardSkeleton() {
  return (
    <Card
      style={{
        border: "solid 3px #e0e4f2",
        margin: "1.5rem 0",
        borderRadius: "20px",
        padding: ".75rem 2rem",
        boxShadow: "none",
      }}
    >
      {/* Card Header in a div with Bookmark */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 0,
          padding: ".5rem 0rem",
        }}
      >
        <CardHeader
          style={{
            width: "100%",
          }}
          title={<Skeleton width={100} />}
          subheader={<Skeleton width={150} />}
          avatar={
            <Skeleton width={"40px"} height={"40px"} variant="circular" />
          }
          sx={{
            zIndex: 1,
          }}
          action={
            <div
              style={{
                display: "flex",
                marginLeft: "auto 0",
              }}
            >
              {[1, 2, 3].map((val) => (
                <Skeleton
                  key={val}
                  variant="rectangular"
                  style={{
                    borderRadius: "20px",
                    marginLeft: "10px",
                  }}
                  width={80}
                  height={30}
                />
              ))}
            </div>
          }
        />
      </div>

      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Skeleton variant="rounded" width={"100%"} height={200} />
      </CardContent>
    </Card>
  );
}
