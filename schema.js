const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLSchema,
} = require("graphql");

const axios = require("axios");

const CardsType = new GraphQLObjectType({
    name: "Cards",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        desc: { type: GraphQLString },
        atk: { type: GraphQLString },
        def: { type: GraphQLString },
        level: { type: GraphQLString },
        race: { type: GraphQLString },
        attribute: { type: GraphQLString },
        archetype: { type: GraphQLString },
        card_sets: { type: SetType },
        card_images: { type: ImageType },
        card_prices: { type: PriceType },
    }),
});

const SetType = new GraphQLObjectType({
    name: "Set",
    fields: () => ({
        set_name: { type: GraphQLString },
        set_code: { type: GraphQLString },
        set_rarity: { type: GraphQLString },
        set_price: { type: GraphQLString },
    }),
});

const ImageType = new GraphQLObjectType({
    name: "Image",
    fields: () => ({
        id: { type: GraphQLString },
        image_url: { type: GraphQLString },
        image_url_small: { type: GraphQLString },
    }),
});

const PriceType = new GraphQLObjectType({
    name: "Price",
    fields: () => ({
        cardmarket_price: { type: GraphQLString },
        tcgplayer_price: { type: GraphQLString },
        ebay_price: { type: GraphQLString },
        amazon_price: { type: GraphQLString },
    }),
});

const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        cards: {
            type: new GraphQLList(CardsType),
            resolve(parent, args) {
                const url = "https://db.ygoprodeck.com/api/v5/cardinfo.php";
                return axios.get(url).then((res) => res.data);
            },
        },
        card: {
            type: new GraphQLList(CardsType),
            args: {
                name: { type: GraphQLString },
            },
            resolve(parent, args) {
                const url = `https://db.ygoprodeck.com/api/v5/cardinfo.php?name=${args.name}`;
                return axios.get(url).then((res) => res.data);
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQueryType,
});
