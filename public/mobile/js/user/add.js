/**
 * Created by lcw on 2018/5/31.
 */
$(function () {
    //地址选择组件
    var cityPicker = new mui.PopPicker({layer:3});
    cityPicker.setData(cityData);
    //3.点击确认提交修改
    $('body').on('click','.btn_submit',function () {
        //1.get form serialize serializeArray(array) data
        //使用.serialize()自动调用了encodeURIComponent方法将数据编码了，使用数据只需解码即可
        var that = $(this);
        var data = $('form').serialize();
        var inputData = ct.serialize2object(data);
        if (!inputData.recipients) {
            mui.toast('请输入收货人');
            return false;
        }
        if(!(/^\d{6}$/.test(inputData.postCode))){
            mui.toast('请输入合法邮编');
            return false;
        }
        if (!inputData.postCode) {
            mui.toast('请输入邮编');
            return false;
        }
        if (!inputData.address) {
            mui.toast('请输入地址');
            return false;
        }
        if (!inputData.addressDetail) {
            mui.toast('请输入详细地址');
            return false;
        }
        $.ajax({
            url:'/address/addAddress',
            type:'post',
            data:inputData,
            dataType:'json',
            beforeSend: function () {
                that.html('正在修改...')
            },
            success: function (data) {
                if(data.success == true) {
                    setTimeout(function () {
                        mui.toast('添加成功');
                        location.href = ct.addressUrl;
                    },500);
                } else {
                    mui.toast(data.message);
                }
            }
        })


    }).on('click','[name="address"]',function(){
        cityPicker.show(function(items) {
            if(items[0].text == items[1].text){
                items[0].text = '';
            }
            $('[name="address"]').val(items[0].text+items[1].text+(items[2].text||''));
            //返回 false 可以阻止选择框的关闭
        });
    });
});