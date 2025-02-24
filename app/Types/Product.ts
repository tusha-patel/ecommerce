export interface ProductImage {
    color: string;
    colorCode: string;
    image: string;
}

export interface Review {
    id: string;
    userId: string;
    productId?: string;
    rating?: number;
    comment?: string;
    createdDate?: string;
    user?: {
        id: string;
        name: string;
        email: string;
        emailVerified: string | null;
        image: string;
        hashedPassword: string | null;
        createdAt: string;
        updatedAt: string;
        role: string;
    };
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    brand: string;
    category: string;
    inStock: boolean;
    images: ProductImage[];
    reviews: Review[];
}

export type CartProduct = {
    id: string;
    name: string;
    description: string;
    category: string;
    brand: string;
    selectedImg: ProductImage;
    quantity: number;
    price: number;
}