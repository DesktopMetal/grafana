import { css } from '@emotion/css';
import React, { useEffect } from 'react';
import { useMeasure } from 'react-use';

import { GrafanaTheme2 } from '@grafana/data';
import { LoadingPlaceholder, useStyles2 } from '@grafana/ui';
import { News } from 'app/plugins/panel/news/component/News';
import { useNewsFeed } from 'app/plugins/panel/news/useNewsFeed';

interface NewsWrapperProps {
  feedUrl: string;
}
export function NewsWrapper({ feedUrl }: NewsWrapperProps) {
  const styles = useStyles2(getStyles);
  const { state, getNews } = useNewsFeed(feedUrl);
  const [widthRef, widthMeasure] = useMeasure<HTMLDivElement>();

  useEffect(() => {
    getNews();
  }, [getNews]);

  if (state.loading || state.error) {
    return (
      <div className={styles.innerWrapper}>
        {state.loading && <LoadingPlaceholder text="Loading..." />}
        {state.error && state.error.message}
      </div>
    );
  }

  if (!state.value) {
    return null;
  }

  return (
    <div ref={widthRef}>
      {widthMeasure.width > 0 &&
        state.value.map((_, index) => (
          <News key={index} index={index} showImage width={widthMeasure.width} data={state.value} />
        ))}
      <div className={styles.grot}>
        <a href="https://ir.desktopmetal.com/news/press-releases" target="_blank" rel="noreferrer" title="Desktop Metal - Investor Relations">
          <img src="public/img/desktopmetal-logo.svg" alt="Desktop Metal Logo" />
        </a>
      </div>
    </div>
  );
}

const getStyles = (theme: GrafanaTheme2) => {
  return {
    innerWrapper: css`
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    `,
    grot: css({
      display: `flex`,
      alignItems: `center`,
      justifyContent: `center`,
      padding: theme.spacing(5, 0),

      img: {
        width: `186px`,
        height: `186px`,
      },
    }),
  };
};
