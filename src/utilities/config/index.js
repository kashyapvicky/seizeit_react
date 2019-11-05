'use-strict';
module.exports = {
  // apiUrl : 'http://192.168.100.164:8080/api/v1/',
  // baseUrl:'http://192.168.100.164:8080',
  apiUrl:'https://www.seizeit-me.com/api/v1/',
  baseUrl:'https://www.seizeit-me.com',
   headers :  {
    "Accept": "application/json",
    //"Content-Type": "multipart/form-data",
  },
}
          
// if (value.email.match(".*[a-zA-Z]+.*")) {
//   if (!value.email.match(this.emailPattern)) {
//     this.loginForm.controls['email'].setErrors({ 'pattern': true });
//   }
//   this.emailType = 'email';
// }
// else {
//   var reg = /^[0-9]*$/;
//   // var phoneReg=/^[2-9]\d{2}-\d{3}-\d{4}$/
//   if (!value.email.match(reg) || value.email.length > 15) {
//     this.loginForm.controls['email'].setErrors({ 'pattern': true });
//   }
//   this.emailType = 'PhoneNumber'
//   fd.append('countryCode', this.countryCode);
// }