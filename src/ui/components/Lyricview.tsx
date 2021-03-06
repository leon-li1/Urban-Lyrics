import * as React from "react";
import { FC } from "react";
import styled from "styled-components";
import { geniusYellow } from "../theme";

type LyricViewProps = {
  lyrics: string[];
  songTitle: string;
  artist: string;
  geniusUrl: string;
};

export const LyricView: FC<LyricViewProps> = (props) => {
  const { lyrics, songTitle, artist, geniusUrl, children } = props;
  return (
    <LyricContainer>
      <MainContainer>
        <SongTitle>{songTitle}</SongTitle>
        <ArtistName>{artist}</ArtistName>
        {lyrics.map((line, idx) =>
          line.trim() ? (
            <LyricBar key={idx}>{line}</LyricBar>
          ) : (
            <LineBreak key={idx} />
          )
        )}
        <GeniusLink href={geniusUrl} target="_blank">
          Click for Genius page
        </GeniusLink>
      </MainContainer>
      <LookupContainer>{children}</LookupContainer>
    </LyricContainer>
  );
};

const GeniusLink = styled.a`
  font-size: 14px;
  color: black;
`;

const LyricContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${geniusYellow};
  height: 600px;
  box-sizing: border-box;
  padding: 0.5em;
  justify-content: center;
  align-items: center;
`;

const LyricBar = styled.p`
  margin: 0 0 1px 0;
  padding-right: 20px;
  font-family: "Montserrat";
  font-size: 0.6em;
`;

const LineBreak = styled.br``;

const MainContainer = styled.div`
  overflow-y: auto;
  margin-right: -0.5em;
  margin-top: -0.5em;
  padding-right: 0.5em;
  padding-top: 0.5em;
`;

const SongTitle = styled.h2`
  padding: 0;
  margin: 0;
  font-family: "Montserrat";
  font-size: 1em;
`;

const ArtistName = styled.h4`
  padding: 0;
  margin: 0 0 0.5em 0;
  font-family: "Montserrat";
  font-style: italic;
  font-size: 0.7em;
`;

export const LookupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 8px;
  margin-bottom: -8px;
`;
