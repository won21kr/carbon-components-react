import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
if (!process.env.EXCLUDE_SASS) {
  import('carbon-components/consumables/scss/base-elements/file-uploader/file-uploader.scss');
}

class FileUploader extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    tabIndex: PropTypes.number,
    id: PropTypes.string.isRequired,
    labelDescription: PropTypes.string,
    multiple: PropTypes.bool,
    multipleFilesText: PropTypes.func,
    buttonText: PropTypes.string,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    className: 'bx--file__label',
    tabIndex: 0,
    labelDescription: '',
    multiple: true,
    multipleFilesText: count => `${count} files selected`,
    buttonText: 'Choose Files',
    onChange: () => {},
  }

  state = {
    count: 0,
    text: this.props.labelDescription,
  }

  updateLabel = (evt) => {
    const element = evt.target;
    let fileName = '';

    if (element.files && element.files.length > 1) {
      fileName = this.props.multipleFilesText(element.files.length);
      this.setState({ count: element.files.length });
    } else {
      fileName = element.value.split('\\').pop();
      this.setState({ count: 1 });
    }

    if (fileName) {
      this.setState({ text: fileName });
    }
    this.props.onChange(evt);
  }

  render() {
    const {
      className,
      tabIndex,
      id,
      labelDescription,  // eslint-disable-line no-unused-vars
      multiple,
      multipleFilesText,
      buttonText,
      onChange, // eslint-disable-line no-unused-vars
      ...other,
    } = this.props;

    const fileUploaderProps = {
      tabIndex,
      type: 'file',
      multiple,
      id,
      onChange: this.updateLabel,
    };

    const fileUploaderClasses = classNames(className, {
      'bx--file__label': true,
      [this.props.className]: this.props.className,
    });

    const fileUploader = (
      <div className="fileUploaderWrapper">
        <label
          data-file-appearance
          data-button-title={buttonText}
          className={fileUploaderClasses}
          htmlFor={id}
        >{this.state.text}</label>
        <input
          data-file-uploader
          data-multiple-caption={multipleFilesText(this.state.count)}
          data-label="[data-file-appearance]"
          className="bx--file__input"
          {...fileUploaderProps}
          {...other}
        />
      </div>
    );
    return fileUploader;
  }
}

export default FileUploader;
