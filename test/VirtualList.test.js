import React, {Component} from 'react';
// import VirtualList from '../src/components/VirtualList';
import {VirtualList} from '../lib/index';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';

export class Item extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount () {
        this.props.cachePosition(this.node, this.props.index);
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.index, 'renderItem')
        // nextProps.cachePosition(this.node, nextProps.index);
    }

    render () {
        const {index, item} = this.props;

        return (
            <div className='list-item'
                 style={{ height: '60px' }}
                 ref={node => {this.node = node}}
                 key={index}>
                <p>#${index} eligendi voluptatem quisquam</p>
                <p>Modi autem fugiat maiores. Doloremque est sed quis qui nobis. Accusamus dolorem aspernatur sed rem.</p>
            </div>
        )
    }
}

const renderItem = (cachePosition, index) => {
    return (
        <Item
            key={index}
            cachePosition={cachePosition}
            index={index}
        />
    )
}

describe('<VirtualList />', () => {
    // it('renders three <VirtualList /> components', () => {
    //     const wrapper = shallow(<VirtualList data={new Array(1000).fill(1)} renderItem={renderItem} />);
    //     expect(wrapper.find(Item)).to.have.lengthOf(18);
    // });
    it('renders children when passed in', () => {
        const wrapper = shallow((
            <VirtualList data={new Array(1000).fill(1)} renderItem={renderItem}>
            </VirtualList>
        ));
        expect(wrapper.find('.wrapper')).to.have.lengthOf(1);
    });
});