import * as React from "react";
import { FC, useState, useEffect } from "react";
import { LyricCacheObj, LoadingState } from "../util/types";
import { getVideoContent } from "../util/youtube";
import { Error } from "./components/Error";
import { Loading } from "./components/Loading";
import { LyricView } from "./components/LyricView";
import { SongInput } from "./components/SongInput";
import { DefineWordInput } from "./components/DefineWordInput";

type State = LyricCacheObj | { error: string } | false;

// fetches the title (and then lyrics) from storage
async function getData(curTitle: string | null): Promise<LyricCacheObj> {
  const title = curTitle ?? (await getVideoContent());
  const titleKey = `title-${title}`;
  return new Promise((resolve, reject) =>
    chrome.storage.local.get([titleKey], (obj) => {
      if (obj[titleKey]) resolve(obj[titleKey]);
      else reject("data not found in storage");
    })
  );
}

function isLoading(obj: object): obj is LoadingState {
  return (obj as LoadingState).loading;
}

function isErrorState(s: State): s is { error: string } {
  return !!(s as { error: string }).error;
}

export const Overlay: FC = () => {
  const [data, setData] = useState<State>(false);
  const [curTitle, setTitle] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        setData(await getData(curTitle));
      } catch (err) {
        // some kind of error getting the title or loading from storage
        setData({ error: err.toString() });
      }
    }, 500);
    return () => clearInterval(interval);
  }, [curTitle]);

  // If the content script hasn't even set the state to loading yet or we are in loading state
  if (!data || isLoading(data))
    return (
      <Loading>
        <DefineWordInput />
        <SongInput setTitle={setTitle} />
      </Loading>
    );

  // If there was some kind of error fetching the title or lyrics
  if (isErrorState(data))
    return (
      <Error>
        <DefineWordInput />
        <SongInput setTitle={setTitle} />
      </Error>
    );

  // Split by \n
  const lyricsByLine = data.lyrics.split(/\n/);

  return (
    <LyricView
      lyrics={lyricsByLine}
      songTitle={data.songTitle}
      artist={data.artist}
      geniusUrl={data.geniusUrl}
    >
      <DefineWordInput />
      <SongInput setTitle={setTitle} />
    </LyricView>
  );
};
