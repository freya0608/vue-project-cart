/**
 * Created by freya on 2017/3/1.
 */
window.vm = new Vue({
    el:'#app',
    data:{
        showModal:false,
        productList:[],
        totalMoney:0,
        checkAll:false,
        currentProduct:''
    },
    mounted:function () {
        // var _this = this;
        this.cartView();
    },
    filters:{
        formatMoney:function (value, quantity) {
            if(!quantity)quantity++;
            return "￥"+(value*quantity).toFixed(2)+"元";
        }
    },
    methods:{
        cartView:function () {
            $http.get("data/cartData.json").then(function(response) {
                var res = response.data;
                if (res && res.status == '1') {
                    this.productList = res.result.list;
                    this.calcTotalMoney();
                }
            });


        },
        selectAll:function (isCheck) {
            this.checkAll = isCheck;
            this.productList.forEach(function (item) {
                if(typeof item.checked == "undefined"){
                    Vue.set(item,"checked",isCheck);
                }else {
                    item.checked = isCheck;
                }
            });
            this.calcTotalMoney();
        },
        selectedProduct:function (product) {
            if(typeof product.checked=="undefined"){
                this.$set(product,"checked",true);
            }else {
                product.checked =!product.checked;
            }
            this.calcTotalMoney();
            this.isCheckAll();
        },
        isCheckedAll:function () {
            let flag = true;
            this.productList.forEach(function (item) {
                if(!item.checked){
                    flag = false;
                 }
            });
            if(flag){
                this.checkAll = true;
            }else {
                this.checkAll = false;
            }
        },
        calcTotalMoney:function () {
            let totalMoney = 0;
            this.productList.forEach(function (item) {
                if(item.checked){
                    totalMoney += item.productPrice+item.productQuantity;
                }
            });
            this.totalMoney = totalMoney;
        },
        changeMoney:function (product, way) {
            if(way>0){
                product.productQuantity++;
            }else {
                product.productQuantity--;
                if(product.productQuantity<0){
                    product.productQuantity=0;
                }
            }
            this.calcTotalMoney();
        },
        delConfirm:function (product) {
            this.showModal = true;
            this.currentProduct = product;
        },
        delCurrentProduct:function () {
            this.showModal = false;
            var index = this.productList.indexOf(this.currentProduct);
            this.productList.splice(index,1);
        }
    }
});













