/**
 * 
 */
var checkDetail = formValidate.check4Detail('#user');
if (checkDetail.required) {
    $.xwy.layerMessage('请输入要注册手机');
    return ;
} else if (checkDetail.isMobile) {
    $.xwy.layerMessage('请输入正确的手机');
    return ;
} else if (checkDetail.remote) {
    $.xwy.layerMessage('请输入未注册手机');
    return ;
}

.validate({
    rules:{
        user:{
            required:true,
            isMobile:true,
            remote:{
                url:"/xuiajax/exist",
                data:{
                    type:'register',
                    user:function(){
                        return $('#user').val();
                    }
                },
                type:"POST",
                dataType:"JSON"
            }
        },
        code:{
            required:true
        },
        pass:{
            required:true,
            isPassword:true
        },
        verifycode:{
            required:true
        }
    },
    messages:{
        user:{
            required:'请输入手机号',
            isMobile:'请输入正确的手机号',
            remote:'该手机已注册，请您直接<a href="javascript:location.href=\'/xui/login\';">登录</a>！'
        },
        code:{
            required:'请输入激活码'
        },
        pass:{
            required:'请输入密码',
            isPassword:'请输入正确的密码'
        },
        verifycode:{
            required:'请输入图片验证码'
        }
    },
    submitHandler:function(form,event){
        var postData = $(form).serialize();
        $.ajax({
            url:"/xuiajax/register",
            data:postData,
            type:"POST",
            dataType:"JSON",
            beforeSend:function(){
            },
            success:function(retJson){
                if (retJson.code==$.xwy.succCode) {
                    if ($.xwy.TT.getSpecialClient() === $.xwy.clt_h5) {
                        location.href = retJson.url;
                    } else {
                        location.href = 'tt://uc/'+$.xwy.getToken();
                    }
                } else {
                    $.xwy.layerMessage(retJson.info);
                }
            },
            complete:function(xhr,stat){
            },
            error:function(){
            }
        });
        return false;
    }
});
name:{
    required:'请填写真实姓名',
    maxlength:$.validator.format('最多 {0} 个字')
},

$('#fillorderform input[name="contact[name]"]').val(fillContact.name).valid();


$('#touridx'+tplObj.idx).rules('add',{
    required: true,
    messages: {
        required: '请选择旅客'
    }
});

https://jqueryvalidation.org/







