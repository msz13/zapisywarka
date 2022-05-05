'!style-loader!css-loader!sass-loader!../src/styles.scss!"../../../node_modules/@nebular/theme/styles/prebuilt/default.css"';
import { addDecorator } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { withActions} from '@storybook/addon-actions'

addDecorator(withKnobs, withActions);
