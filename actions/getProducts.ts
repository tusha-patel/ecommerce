import prisma from "@/libs/prismadb";



export interface ProductPrisma {
    category?: string | null;
    searchTerm?: string | null;
}


export default async function getProducts(params: ProductPrisma) {
    // console.log(params);
    
    try {

        const { category, searchTerm } = params;
        let searchString = searchTerm;

        if (!searchString) {
            searchString = '';
        }
        let query: any = {};

        if (category) {
            query.category = category
        }


        const products = await prisma.product.findMany({
            where: {
                ...query,
                OR: [
                    {
                        name: {
                            contains: searchString,
                            mode: "insensitive"
                        },
                        description: {
                            contains: searchString,
                            mode: "insensitive"
                        }
                    }
                ]
            },
            include: {
                reviews: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdDate: "desc"
                    }
                }
            }
        });

        // console.log(products);
        return products;
    } catch (error: any) {
        throw new Error(error)
    }
}