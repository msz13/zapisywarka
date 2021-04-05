import { addDecorator } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { withActions} from '@storybook/addon-actions'

addDecorator(withKnobs, withActions);
