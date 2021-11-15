import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { AddShoppingCart } from '@mui/icons-material';

type ProductInfo = {
    name: string,
    price: string,
    description: string
}
interface ProductProps {
    product: ProductInfo,
}

const Product = ({ product }: ProductProps) => {
    return (
        <Card sx={{maxWidth: '100%'}}>
            <CardMedia sx={{height: 0, paddingTop: '56.25%'}} image='' title={product.name}/>
            <CardContent>
                <Box sx={{display: 'flex', justifyContent:'space-between'}}>
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5">
                        {product.price}
                    </Typography>
                </Box>
                <Typography variant="h2" color="textSecondary">
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{display: 'flex', justifyContent:'flex-end'}}>
                <IconButton aria-label="Add to Cart">
                    <AddShoppingCart/>
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product
