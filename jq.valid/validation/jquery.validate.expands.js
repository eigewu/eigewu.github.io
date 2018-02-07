String.prototype.bLength = function() {
    var cArr = this.match(/[^\x00-\xff]/ig);
    return this.length + (cArr == null ? 0 : cArr.length);
};
String.prototype.elength = function() {
    return this.replace(/[^\u0000-\u00ff]/g, "aa").length;
};
String.prototype.tripurl = function() {
    return this.replace(new RegExp("((news|telnet|nttp|file|http|ftp|https)://){1}(([-A-Za-z0-9]+(\\.[-A-Za-z0-9]+)*(\\.[-A-Za-z]{2,5}))|([0-9]{1,3}(\\.[0-9]{1,3}){3}))(:[0-9]*)?(/[-A-Za-z0-9_\\$\\.\\+\\!\\*\\(\\),;:@&=\\?/~\\#\\%]*)*", "gi"), new Array(12).join("aa"));
};
jQuery.extend(jQuery.validator.messages, {
    required: "必须填写",
    remote: "请修正此栏位",
    email: "请输入有效的电子邮件",
    url: "请输入有效的网址",
    date: "请输入有效的日期",
    dateISO: "请输入有效的日期（YYYY-MM-DD）",
    number: "请输入正确的数字",
    digits: "只可输入数字",
    creditcard: "请输入有效的信用卡号码",
    equalTo: "你的输入不相同",
    extension: "请输入有效的后缀",
    maxlength: jQuery.validator.format("最多 {0} 个字"),
    minlength: jQuery.validator.format("最少 {0} 个字"),
    rangelength: jQuery.validator.format("请输入长度为 {0} 至 {1} 之間的字串"),
    range: jQuery.validator.format("请输入 {0} 至 {1} 之间的数值"),
    max: jQuery.validator.format("请输入不大于 {0} 的数值"),
    min: jQuery.validator.format("请输入不小于 {0} 的数值"),
    byteRangeLength: jQuery.validator.format("请确保输入的内容{0}-{1}个字节之间"),
    isMobile: "请输入正确的电话号码",
    isVerifycode: "请输入正确的验证码",
    isPassword: "请输入正确的密码格式",
    isMobileOrEmail: "请输入手机或邮箱",
    patternex: "请输入格式正确的值"
});
jQuery.validator.addMethod("byteRangeLength",function(value, element, param) {
    var length = Math.round(value.bLength() / 2);
    return this.optional(element) || (length >= param[0] && length <= param[1]);
}, jQuery.validator.messages.byteRangeLength);
jQuery.validator.addMethod("isMobile",function(value, element) {
    var mobile = /^((\d{11})|((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})))$/;
    return this.optional(element) || mobile.test(value);
}, jQuery.validator.messages.isMobile);
jQuery.validator.addMethod("isMobileOrEmail",function(value, element) {
    var mobile = /^((\d{11})|((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})))$/;
    var emmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return this.optional(element) || mobile.test(value) || emmail.test(value);
}, jQuery.validator.messages.isMobileOrEmail);
jQuery.validator.addMethod("isVerifycode",function(value, element) {
    var regex = /^[0-9a-zA-Z]{4}$/;
    return this.optional(element) || regex.test(value);
}, jQuery.validator.messages.isVerifycode);
jQuery.validator.addMethod("isPassword",function(value, element) {
    var regex = /^.{6,}$/;
    return this.optional(element) || regex.test(value);
}, jQuery.validator.messages.isPassword);
$.validator.addMethod("patternex",function(value,element,param) {
    if (this.optional(element)) {
        return true;
    }
    if (typeof param === "string") {
        param = new RegExp( "^(?:" + param + ")$" );
    } else if (typeof param === "function") {
        param = param();
        param = new RegExp( "^(?:" + param + ")$" );
    }
    return param.test( value );
}, jQuery.validator.messages.patternex);
$.validator.prototype.check4Detail=function(element){
    element = this.validationTargetFor(this.clean(element));

    var rules = $(element).rules(),
    rulesCount = $.map(rules,function(n,i){
        return i;
    }).length,
    dependencyMismatch = false,
    val = this.elementValue(element),
    result, method, rule, ruleDetail = {};

    for (method in rules) {
        rule = {
            method: method,
            parameters: rules[method]
        };
        try {
            result = $.validator.methods[method].call(this, val, element, rule.parameters);
            if (!result) {
                ruleDetail[method] = this.defaultMessage(element, method);
            }
        } catch (e) {
            if (this.settings.debug && window.console) {
                console.log("Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e);
            }
            throw e;
        }
    }
    return ruleDetail;
};
$.validator.setDefaults({
    ignore:"",
    onclick:false,
    onkeyup:false,
    validClass:"validate-valid",
    errorClass:"validate-error",
    errorElement:"em"
});