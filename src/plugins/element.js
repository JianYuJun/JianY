import Vue from 'vue'
import { Button, Input, Form, FormItem, Message, Container, Header, Aside, Main, Menu, Submenu, MenuItem, } from 'element-ui'

Vue
    .use(Button)
    .use(Input)
    .use(Form)
    .use(FormItem)
    .use(Container)
    .use(Header)
    .use(Aside)
    .use(Main)
    .use(Menu)
    .use(Submenu)
    .use(MenuItem)

Vue.prototype.$message = Message