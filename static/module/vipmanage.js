/**
 * Created by Msater Zg on 2017/6/12.
 */
define(function (require, exports, module) {
    // 通过 require 引入依赖,加载所需要的js文件
    var api = require('../../static/common/js/api');
    var vipNumberFinal = '';
    var personId = '';
    var returnBookId = [];
    var memId = 0;
    $('.form-control.vip-number').focus();
    var userInfo = {
        reader_id: '',
        phone_no: '',
        nick_name: '',
        r_name: '',
        r_sex: '',
        r_birthday: '',
        name: '',
        address: '',
        email: '',
        mem_id: '',
        paid_tag: '',
        register_date: '',
        paid_date: '',
        paid_info: '',
        mem_start: '',
        mem_end: '',
        arsuggestion: '',
        lexile_suggestion: '',
        r_count: '',
        rw_count: ''
    };
    $.datetimepicker.setLocale('zh');
    $('.r_birthday').datetimepicker({
        format: 'Y-m-d',
        timepicker: false

    });
    $('.register_date').datetimepicker({
        format: 'Y-m-d',
        timepicker: false

    });
    $('.paid_date').datetimepicker({
        format: 'Y-m-d',
        timepicker: false
    });

    $('.mem_start').datetimepicker({
        format: 'Y-m-d',
        onShow: function (ct) {
            this.setOptions({
                maxDate: $('.mem_end').val() ? $('.mem_end').val() : false
            })
        },
        timepicker: false
    });
    $('.mem_end').datetimepicker({
        format: 'Y-m-d',
        onShow: function (ct) {
            this.setOptions({
                minDate: $('.mem_start').val() ? $('.mem_start').val() : false
            })
        },
        timepicker: false
    });

    function emptyForm() {
        for (var objectName in userInfo) {//用javascript的for/in循环遍历对象的属性
            $('.form-control.' + objectName + '').val('');
        }
        vipNumberFinal = '';
        personId = '';
        returnBookId = [];
        $('.vip-borrow').empty();
        $('.vip-destine').empty();
    }

    $('#post-scheme-btn').click(function () {
        var userInfoData = {};
        for (var objectName in userInfo) {//用javascript的for/in循环遍历对象的属性
            userInfoData[objectName] = $('.form-control.' + objectName + '').val();
        }
        userInfoData.id = personId;

        var userInfoObject = {
            id: userInfoData.id,
            readerId: userInfoData.reader_id,
            phoneNo: userInfoData.phone_no,
            nickName: userInfoData.nick_name,
            rname: userInfoData.r_name,
            rsex: userInfoData.r_sex,
            rbirthday: userInfoData.r_birthday,
            name: userInfoData.name,
            address: userInfoData.address,
            email: userInfoData.email,
            memId: userInfoData.mem_id,
            paidTag: userInfoData.paid_tag,
            registerDate: userInfoData.register_date,
            paidDate: userInfoData.paid_date,
            paidInfo: userInfoData.paid_info,
            memStart: userInfoData.mem_start,
            memEnd: userInfoData.mem_end,
            arsuggestion: userInfoData.arsuggestion,
            lexileSuggestion: userInfoData.lexile_suggestion,
            rCount: userInfoData.r_count,
            rwCount: userInfoData.rw_count
        };
        var borrowBookId = [];
        var orderBookId = [];
        $('.vip-borrow span.label-primary').each(function () {
            borrowBookId.push($(this).attr('data-library-id'));
        });
        $('.vip-destine span.label-primary').each(function () {
            orderBookId.push($(this).attr('data-book-id'));
        });
        api.user.userManage.postUserData(JSON.stringify(userInfoObject),
            returnBookId.join(),
            borrowBookId.join(),
            orderBookId.join(),
            function (rep) {
                layer.msg(' 借 阅 完 成 ！', {
                    icon: 1,
                    time: 1200,
                });
                emptyForm();
                $('.form-control.vip-number').focus();
            });
    });


    // 最后点击确认的时候，需要传个人信息，同时传信息的已借书籍的id，还书的id，预定书籍的id

    $('#search-vipuser').click(function () {
        operationFunc();
    });

    function operationFunc() {
        var vipNumber = $('.form-control.vip-number').val();
        var vipNumberLen = vipNumber.length;
        if (vipNumber === '') {
            layer.msg('条形码为空', {
                time: 1500
            });
        } else if (vipNumberLen === 12) {
            if (vipNumberFinal === '') {
                layer.msg('请先扫描用户', {
                    time: 1500
                });
            } else {
                var vipNumberSplit = vipNumber.substring(2, 11);
                var number = 0;
                $('.vip-borrow span.label-primary').each(function () {
                    number++;
                });
                console.log(number);
                console.log(parseInt(memId) * 5);
                if (number >= parseInt(memId) * 5) {
                    layer.msg('借书数量上限', {
                        time: 1500
                    });
                } else {
                    api.user.userManage.vipBorrowReturn(vipNumberFinal, vipNumberSplit, function (rep) {
                        var bookInfo = rep.book;
                        switch (rep.result) {
                            case "1":
                                // 借这本书，但没有预定
                                var flag = 1;
                                $('.vip-borrow span').each(function () {
                                    if ($(this).attr('data-library-id') === vipNumberSplit) {
                                        flag = 0;
                                    }
                                });
                                if (flag) {
                                    $('.vip-borrow').append('<span class="label label-primary span-icon-cursor" data-library-id="' + vipNumberSplit + '">'
                                        + bookInfo.name +
                                        '-' + bookInfo.author + '&nbsp;<span class="glyphicon glyphicon-remove"></span></span>');
                                }
                                break;
                            case "2":
                                // 借这本书，但已经预定了
                                var flag = 1;
                                $('.vip-borrow span').each(function () {
                                    if ($(this).attr('data-library-id') === vipNumberSplit) {
                                        flag = 0;
                                    }
                                });
                                if (flag) {
                                    $('.vip-borrow').append('<span class="label label-primary span-icon-cursor" data-library-id="' + vipNumberSplit + '">' + bookInfo.name +
                                        '-' + bookInfo.author + '&nbsp;<span class="glyphicon glyphicon-remove"></span></span>'
                                    );
                                    $('.vip-destine span[data-book-id=' + bookInfo.id + ']').remove();
                                }
                                break;
                            case "3":
                                // 还书，需要删除会员已借里面的
                                returnBookId.push(vipNumberSplit);
                                $('.vip-borrow span[data-library-id=' + vipNumberSplit + ']').remove();
                                break;
                            case "0":
                                layer.msg('图书馆暂无此书！', {
                                    time: 1500
                                });
                                break;
                            default:
                                break;
                        }
                    });
                }
            }
        } else if (vipNumberLen === 8 || vipNumberLen === 11) {
            vipNumberFinal = vipNumber;
            api.user.userManage.getUserInfo(vipNumber, function (rep) {
                if (rep.result) {

                    var personInfo = rep.person;
                    personId = personInfo.id;
                    memId = personInfo.mem_id
                    var stockInfo = rep.stock;
                    var stockInfoLen = rep.stock.length;
                    var orderInfo = rep.order;
                    var orderInfoLen = rep.order.length;
                    for (var objectName in userInfo) {//用javascript的for/in循环遍历对象的属性
                        $('.form-control.' + objectName + '').val(personInfo[objectName]);
                    }
                    var stockDom = [];
                    var orderDom = [];
                    // 渲染已订书籍的dom
                    for (var i = 0; i < stockInfoLen; i++) {
                        stockDom.push('<span class="label label-primary span-icon-cursor" data-library-id="' + stockInfo[i].library_id + '">' + stockInfo[i].name +
                            '-' + stockInfo[i].author + '&nbsp;<span class="glyphicon glyphicon-remove book-remove"></span></span>'
                        );
                    }
                    $('.vip-borrow').empty();
                    $('.vip-borrow').append(stockDom.join(''));
                    // 渲染预定书籍的dom
                    for (var i = 0; i < orderInfoLen; i++) {
                        orderDom.push('<span class="label label-primary span-icon-cursor" data-book-id="' + orderInfo[i].id + '">' + orderInfo[i].name +
                            '-' + orderInfo[i].author + '</span>'
                        );
                    }
                    $('.vip-destine').empty();
                    $('.vip-destine').append(orderDom.join(''));
                } else {
                    layer.msg('没有此用户！', {
                        time: 1500
                    });
                }

            });
        } else {
            layer.msg('无效条形码', {
                time: 1500
            });
        }
        $('.form-control.vip-number').val('');
    }

    /*    $('.vip-borrow').on('click', '.label-primary', function () {
            $(this).remove();
        });*/

    $(document).keypress(function (e) {
        if (e.charCode == 13) {
            operationFunc();
        }
    });

    $('.vip-borrow').on('click', '.book-remove', function (event) {
        $(this).parent().remove();
        event.stopPropagation();
    });

    $('.vip-destine').on('click', '.label-primary', function () {
        api.book.bookManage.getBookStockInfo($(this).attr('data-book-id'), function (rep) {
            if (rep.result === 0) {
                layer.msg('库存不足!', {
                    time: 1500
                });
            } else {
                $('#book-img').prop("src", "http://106.15.90.228:8090/dummyPath/" + rep.isbn13 + "" + ".jpg");
                $('.form-control.book_case').val(rep.book_case);
                $('.form-control.library_id').val(rep.library_id);
                $('.form-control.isbn13').val(rep.isbn13);
                $('.form-control.isbn10').val(rep.isbn10);
                $('.form-control.book.name').val(rep.name);
                layer.open({
                    title: '书籍信息展示',
                    type: 1,
                    area: ['42%', '55%'], //宽高
                    content: $('#book-case-dialog')
                });
            }
        });
    });

    $('.vip-borrow').on('click', '.label-primary', function () {
        api.book.bookManage.getBookCase($(this).attr('data-library-id'), function (rep) {
            $('#book-img').prop("src", "http://106.15.90.228:8090/dummyPath/" + rep.isbn13 + "" + ".jpg");
            $('.form-control.book_case').val(rep.book_case);
            $('.form-control.library_id').val(rep.library_id);
            $('.form-control.isbn13').val(rep.isbn13);
            $('.form-control.isbn10').val(rep.isbn10);
            $('.form-control.book.name').val(rep.name);
            layer.open({
                title: '书籍信息展示',
                type: 1,
                area: ['42%', '55%'], //宽高
                content: $('#book-case-dialog')
            });
        });
    });
});
