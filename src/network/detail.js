import {request} from "./request";

export function getDetail(iid) {
    return request({
        url:'/detail',
        params:{
            iid
        }
    })
}

export function getRecommend(){
    return request({
        url:'/recommend'
    })
}
export class Goods{
    constructor(itemInfo, columns, services){
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.columns = columns;
        this.services = services;
        this.realPrice = itemInfo.lowNowPrice;
    }
}

export class Shop{
    constructor(shopInfo){
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods;
    }
}

export class GoodsParam{
    constructor(info, rule){
        //this.image = info.images ? info.image[0] : '';
        //this.image = info.image[0];
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}

export class Comment{
    //constructor(comment, total){
    constructor(comment){
        if(comment.imgTotal != 0){
            this.avatar = comment.list[0].user.avatar;
            this.username = comment.list[0].user.uname;
            this.comment = comment.list[0].content;
            this.time = comment.list[0].created;
            this.style = comment.list[0].style;
            this.images = comment.list[0].images;
        }
    }
}