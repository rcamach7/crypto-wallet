import { NewsArticleCard } from "../components/Home/NewsArticleCard";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import { useTheme } from "@mui/material";
import { useAppSelector } from "../features/hooks";
import { LoadingUx } from "../components/LoadingUx";
import { NewsArticleWrapper } from "../components/styled/News.styled";

export const News = () => {
  const newsArticles = useAppSelector((state) => state.newsArticles.value);
  const theme = useTheme();

  return (
    <NewsArticleWrapper theme={theme.palette.mode}>
      <span style={{ textAlign: "center", padding: "25px 0" }}>
        {newsArticles.length ? (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              color: theme.palette.mode === "light" ? "black" : "white",
            }}
          >
            <OnlinePredictionIcon
              color="success"
              className="animate__animated animate__fadeIn animate__infinite animate__slower"
            />
            Trending News
            <OnlinePredictionIcon
              color="success"
              className="animate__animated animate__fadeIn animate__infinite animate__slower"
            />
          </span>
        ) : (
          ""
        )}
      </span>
      <div className="newsArticlesContainer">
        {newsArticles.map((article, i) => {
          return <NewsArticleCard key={i} article={article} />;
        })}
      </div>

      {!newsArticles.length && <LoadingUx />}
    </NewsArticleWrapper>
  );
};
