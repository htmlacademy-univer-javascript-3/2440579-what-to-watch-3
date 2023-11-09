export type PreviewPlayerProps = {
    videoLink: string;
    posterImage: string;
    width: number;
    height: number;
    muted: boolean;
    autoPlay: boolean;
};

export function PreviewPlayer(props: PreviewPlayerProps): JSX.Element {
  return (
    <video src={props.videoLink}
      poster={props.posterImage}
      width={props.width}
      height={props.height}
      muted={props.muted}
      autoPlay={props.autoPlay}
    />
  );
}
