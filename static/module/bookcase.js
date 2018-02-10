/**
 * Created by Msater Zg on 2017/6/12.
 */
define(function (require, exports, module) {
    // 通过 require 引入依赖,加载所需要的js文件
    var api = require('../../static/common/js/api');
    $('.form-control.book-isbn').focus();
    $(document).keypress(function (e) {
        if (e.charCode == 13) {
            if ($('.form-control.library_id').val() === '') {
                var bookIsbn = $('.form-control.book-isbn').val().substring(2, 11);
                if (bookIsbn !== '') {
                    //还书操作
                    api.book.bookManage.getBookCase(bookIsbn, function (rep) {
                        if (rep.result !== 2) {
                            console.log(rep)
                            $('.form-control.library_id').val(rep.library_id);
                            $('.form-control.isbn13').val(rep.isbn13);
                            $('.form-control.isbn10').val(rep.isbn10);
                            $('.form-control.name').val(rep.name);
                            $('.form-control.book_case').val(rep.book_case);
                            $('#book-img').prop("src", "http://106.15.90.228:8090/dummyPath/" + rep.isbn13 + "" + ".jpg");
                            layer.open({
                                title: '书架信息填写',
                                type: 1,
                                area: ['42%', '65%'], //宽高
                                content: $('#book-case-dialog')
                            });
                            $('.form-control.book_case').focus();
                        } else {
                            layer.msg('图书馆暂无此书！', {
                                time: 1200,
                            });
                        }

                    });
                }
                $('.form-control.book-isbn').val('');
            } else {
                api.book.bookManage.updateBookCase($('.form-control.library_id').val(),
                    $('.form-control.book_case').val(), function (rep) {
                        layer.closeAll();
                        $('.form-control.book-isbn').focus();
                        $('.form-control.library_id').val('');
                        if (rep.result) {
                            layer.msg(' 信息修改完成 ！', {
                                icon: 1,
                                time: 1200,
                            });
                        } else {
                            layer.msg(' 信息修改失败 ！', {
                                icon: 2,
                                time: 1200,
                            });
                        }
                    });
            }
        }
    });

    $('#post-btn').click(function () {
        api.book.bookManage.updateBookCase($('.form-control.library_id').val(),
            $('.form-control.book_case').val(), function (rep) {
                layer.closeAll();
                $('.form-control.book-isbn').focus();
                $('.form-control.library_id').val('');
                if (rep.result) {
                    layer.msg(' 信息修改完成 ！', {
                        icon: 1,
                        time: 1200,
                    });
                } else {
                    layer.msg(' 信息修改失败 ！', {
                        icon: 2,
                        time: 1200,
                    });
                }
            });
    });

});
