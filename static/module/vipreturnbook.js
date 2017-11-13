/**
 * Created by Msater Zg on 2017/6/12.
 */
define(function (require, exports, module) {
    // 通过 require 引入依赖,加载所需要的js文件
    var api = require('../../static/common/js/api');

    $(document).keypress(function (e) {
        if (e.charCode == 13) {
            var bookIsbn = $('.form-control.book-isbn').val();
            if (bookIsbn !== '') {
                //还书操作
                api.book.bookManage.getBookCase(bookIsbn, function (rep) {
                    console.log(rep);
                    if (rep.result === 2) {
                        layer.msg('没有此书，请重新输入', {
                            time: 1200,
                        });
                    }else {
                        $('.form-control.library_id').val(rep.library_id);
                        $('.form-control.isbn13').val(rep.isbn13);
                        $('.form-control.isbn10').val(rep.isbn10);
                        $('.form-control.name').val(rep.name);
                        layer.open({
                            title: '书本信息',
                            type: 1,
                            area: ['42%', '65%'], //宽高
                            content: $('#book-case-dialog')
                        });
                    }

                });
            }
            $('.form-control.book-isbn').val('');
        }
    });

    $('#post-btn').click(function () {
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
    });

});
