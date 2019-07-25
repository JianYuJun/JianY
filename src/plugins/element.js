import Vue from 'vue'
// 按需引入
import {
    Button,
    Input,
    Form,
    FormItem,
    Message,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    Submenu,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Tooltip,
    Switch,
    Pagination,
    Dialog,
    MessageBox,
    Tag,
    Tree,
    Select,
    Option,
    Cascader,
    Alert,
    Tabs,
    TabPane,
    Steps,
    Step,
    CheckboxGroup,
    Checkbox,
    Upload,
    Timeline,
    TimelineItem

} from 'element-ui'

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
    .use(Breadcrumb)
    .use(BreadcrumbItem)
    .use(Card)
    .use(Row)
    .use(Col)
    .use(Table)
    .use(TableColumn)
    .use(Tooltip)
    .use(Switch)
    .use(Pagination)
    .use(Dialog)
    .use(Tag)
    .use(Tree)
    .use(Select)
    .use(Option)
    .use(Cascader)
    .use(Alert)
    .use(Tabs)
    .use(TabPane)
    .use(Steps)
    .use(Step)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(Upload)
    .use(Timeline)
    .use(TimelineItem)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm