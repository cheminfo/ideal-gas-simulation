import animControl from './animControl';
import atomsControl from './atomsControl';

window.el = {
    $cell: true,
    style: "font-family: Helvetica; font-size: 14px;",
    $components: [
        {
            $components: animControl
        },
        {
            $components: atomsControl
        }
    ]
};