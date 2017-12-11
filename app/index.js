/**
 * Created by Msater Zg on 2017/1/6.
 */
define(function (require, exports, module) {
    $('.nav-menu a').unbind('click').click(function () {
        $('.nav-menu a').removeClass('active');
        $(this).addClass('active');
    });

    $('#user-info').unbind('click').click(function () {
        $('.user-info-choice').fadeToggle();
    });

    if (localStorage.getItem('userAccount') === null || localStorage.getItem('userAccount') === '') {
        window.location.href = './login.html';
    }

});
