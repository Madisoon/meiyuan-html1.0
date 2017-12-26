/**
 * Created by Msater Zg on 2017/6/12.
 */
define(function (require, exports, module) {
    // 通过 require 引入依赖,加载所需要的js文件
    var api = require('../../static/common/js/api');
    $('.form-control.book-isbn').focus();
    $(document).keypress(function (e) {
        if (e.charCode == 13) {
            var bookIsbn = $('.form-control.book-isbn').val().substring(1, 10);
            if (bookIsbn !== '') {
                //还书操作
                api.book.bookManage.getBookCase(bookIsbn, function (rep) {
                    if (rep.result === 2) {
                        layer.msg('没有此书，请重新输入', {
                            time: 1200,
                        });
                    } else {
                        console.log(rep);
                        if (rep.user_info_id === 88888888) {
                            layer.msg('此书并没有借出，请重新输入', {
                                time: 1200,
                            });
                            $('.form-control.phone').val('');
                            $('.form-control.library_id').val('');
                            $('.form-control.isbn13').val('');
                            $('.form-control.isbn10').val('');
                            $('.form-control.name').val('');
                            $('#book-img').prop("src", "");
                        } else {
                            $('.form-control.phone').val(rep.phone_no);
                            $('.form-control.library_id').val(rep.library_id);
                            $('.form-control.isbn13').val(rep.isbn13);
                            $('.form-control.isbn10').val(rep.isbn10);
                            $('.form-control.name').val(rep.name);
                            $('#book-img').prop("src", "http://106.15.90.228:8090/dummyPath/" + rep.isbn13 + "" + ".jpg");
                            api.book.bookManage.returnBook($('.form-control.library_id').val(), function (rep) {
                                layer.closeAll();
                                if (rep.result) {
                                    layer.msg(' 还书成功', {
                                        icon: 1,
                                        time: 1200,
                                    });
                                } else {
                                    layer.msg(' 还书失败', {
                                        icon: 2,
                                        time: 1200,
                                    });
                                }

                            });
                        }
                    }

                });
            }
            $('.form-control.book-isbn').val('');
        }
    });

});
