import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';


export interface IEachImage {
    id: number,
    title: {
        romaji: string
    },
    description: string,
    coverImage : {
        large: string
      }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    imageList: {
      width: "80vw",
      height: "80vh",
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }),
);

const ImageViews:React.FC<{itemData: IEachImage[]}> = ({itemData}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ImageList rowHeight={280} className={classes.imageList}>
        <ImageListItem key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">Image Grid</ListSubheader>
        </ImageListItem>
        {(itemData as IEachImage[]).map((item) => (
          <ImageListItem key={item.id}>
            <img src={item.coverImage.large} alt={item.title.romaji} />
            <ImageListItemBar
              title={item.title.romaji}
              subtitle={<span> {`${item.description}`}</span>}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
export default ImageViews