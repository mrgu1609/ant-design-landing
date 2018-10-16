import React from 'react';
import { Button } from 'antd';
import QueueAnim from 'rc-queue-anim';
import Texty from 'rc-texty';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import 'rc-texty/assets/index.css';
/* replace-start */
import './index.less';
/* replace-end */
class Banner extends React.PureComponent {
  render() {
    const { ...currentProps } = this.props;
    const { dataSource } = currentProps;
    delete currentProps.dataSource;
    delete currentProps.isMobile;
    const children = dataSource.textWrapper.children.map((item) => {
      const { name, texty, ...$item } = item;
      if (name === 'button') {
        return (
          <Button
            type="primary"
            key={name}
            {...$item}
          >
            {/* replace-start-value = item.children */
              React.createElement('span', { dangerouslySetInnerHTML: { __html: item.children } })
           /* replace-end-value */}
          </Button>
        );
      }
      /* replace-start */
      if (texty) {
        $item['data-edit'] = 'texty';
      }
      /* replace-end */
      return (
        <div
          key={name}
          {...$item}
        >
          {
            texty
              ? (
                <Texty type="mask-bottom">
                  {item.children}
                </Texty>
              )
              : (
                /* replace-start-value = : item.children */
                React.createElement('span', { dangerouslySetInnerHTML: { __html: item.children } })
                /* replace-end-value */
              )
          }
        </div>
      );
    });
    return (
      <OverPack
        {...currentProps}
        {...dataSource.OverPack}
      >
        <QueueAnim
          key="QueueAnim"
          type={['bottom', 'top']}
          delay={200}
          {...dataSource.textWrapper}
        >
          {children}
        </QueueAnim>
      </OverPack>
    );
  }
}
export default Banner;