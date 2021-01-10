import * as React from 'react';
import { useSelector } from 'react-redux';
import { products, store, remove } from '../store';
import {
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    IconButton,
    Avatar,
    Typography,
    makeStyles,
    Theme,
    createStyles
  } from "@material-ui/core";
  import DeleteIcon from "@material-ui/icons/Delete"


  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper
    },
    inline: {
      display: "inline"
    },
    listItem: {
      padding: theme.spacing(1, 0),
      justifyContent: "flex-end"
    },
    total: {
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.typography.fontSize * 2
    }
  })
)
 
const Basket: React.FC = () => {
    const classes = useStyles({})
    const product = useSelector(products);

    return (
        <>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Shopping Basket
          </Typography>
          <Typography component="p" variant="body1">
            You have {product.filter(prod => prod.quantity).length} items in your basket
          </Typography>
          <List className={classes.root}>
            {product.filter(prod => prod.quantity >= 1).map((prod) => (
                <React.Fragment key={prod.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Product" src={prod.imageUrl} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={prod.title}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            &pound;{(prod.price * prod.quantity).toFixed(2)}
                          </Typography>
                          {` — ${prod.description}`}
                        </React.Fragment>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => store.dispatch(remove({ id: prod.id }))}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            <ListItem className={classes.listItem}>
              <Typography variant="subtitle1" className={classes.total}>
                &pound;
                {(
                  product.filter(prod => prod.quantity >= 1)
                    .reduce((acc, current) => (acc + (current.price * current.quantity)), 0)
                ).toFixed(2)}
              </Typography>
            </ListItem>
          </List>
        </>
      )
}
 
export default Basket;