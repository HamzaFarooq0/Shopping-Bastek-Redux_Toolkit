import React from "react"
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles"
import ButtonBase from "@material-ui/core/ButtonBase"
import Typography from "@material-ui/core/Typography"
import { useSelector } from "react-redux"

import { ProductItem } from "../types/global"
import { store, add, products } from "../store"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      minWidth: 300,
      width: "100%"
    },
    image: {
      position: "relative",
      height: 200,
      [theme.breakpoints.down("xs")]: {
        width: "100% !important", // Overrides inline-style
        height: 100
      },
      "&:hover, &$focusVisible": {
        zIndex: 1,
        "& $imageBackdrop": {
          opacity: 0.15
        },
        "& $imageMarked": {
          opacity: 0
        },
        "& $imageTitle": {
          border: "4px solid currentColor"
        }
      }
    },
    focusVisible: {},
    imageButton: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.common.white
    },
    imageSrc: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: "cover",
      backgroundPosition: "center 40%"
    },
    imageBackdrop: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create("opacity")
    },
    imageTitle: {
      position: "relative",
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: "absolute",
      bottom: -2,
      left: "calc(50% - 9px)",
      transition: theme.transitions.create("opacity")
    }
  })
)
 
const Product: React.FC = () => {
    const classes = useStyles({})
    const product = useSelector(products);

    return ( 
        <div className={classes.root}>
        {product.map((prod: ProductItem) =>{ 
          return (
          <ButtonBase
            focusRipple
            key={prod.id}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            onClick={() => store.dispatch(add(prod))}
            style={{
              width: `${100 / product.length}%`
            }}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${prod.imageUrl})`
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                {prod.title}
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
        )})}
      </div>
     );
}
 
export default Product;