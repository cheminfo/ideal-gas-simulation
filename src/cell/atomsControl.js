import {addAtom} from '../p2/atoms';
import {atomTypes} from '../constants';

export default [
    {
        $type: 'select',
        id: 'atomTypeSelection',
        $components: Object.keys(atomTypes).map(key => {
            return {
                $type: 'option',
                value: key,
                $html: key
            }
        })
    },
    {
        $type: "input",
        type: "button",
        value: "Add circle random",
        onclick: function() {
            addAtom({
                kind: document.getElementById('atomTypeSelection').value,
            });
        }
    },
    {$type: 'br'}

]