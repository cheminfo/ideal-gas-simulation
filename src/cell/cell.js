import animControl from './animControl';
import atomsControl from './atomsControl';
import sparklines from './sparklines';

window.el = {
    $cell: true,
    style: "font-family: Helvetica; font-size: 14px;",
    $components: [
        {
            $components: animControl
        },
        {
            $components: atomsControl
        },
        {
            $components: sparklines
        }
    ]
};