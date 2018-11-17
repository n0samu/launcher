import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { GameOrder, IGameOrderChangeEvent } from './GameOrder';
import { Paths } from '../Paths';
import * as Util from '../Util';
import { OpenIcon } from './OpenIcon';
import { SearchQuery } from '../store/search';

export interface IHeaderProps extends RouteComponentProps {
  search: SearchQuery;
  onSearch: (text: string, redirect: boolean) => void;
  onOrderChange?: (event: IGameOrderChangeEvent) => void;
  onToggleLeftSidebarClick?: () => void;
  onToggleRightSidebarClick?: () => void;
}

export interface IHeaderState {
  searchText: string;
}

export class Header extends React.Component<IHeaderProps, IHeaderState> {
  constructor(props: IHeaderProps) {
    super(props);
    this.state = {
      searchText: this.props.search.text,
    };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchKeyDown = this.onSearchKeyDown.bind(this);
  }

  render() {
    const showLeftSidebar = window.External.preferences.data.browsePageShowLeftSidebar;
    const showRightSidebar = window.External.preferences.data.browsePageShowRightSidebar;
    return (
      <div className='header'>
        {/* Header Menu */}
        <div className='header__wrap'>
          <ul className='header__menu'>
            <li className='header__menu__item'>
              <Link to={Paths.home} className='header__menu__item__link'>Home</Link>
            </li>
            <li className='header__menu__item'>
              <Link to={Paths.browse} className='header__menu__item__link'>Browse</Link>
            </li>
            <li className='header__menu__item'>
              <Link to={Paths.logs} className='header__menu__item__link'>Logs</Link>
            </li>
            <li className='header__menu__item'>
              <Link to={Paths.config} className='header__menu__item__link'>Config</Link>
            </li>
            <li className='header__menu__item'>
              <Link to={Paths.about} className='header__menu__item__link'>About</Link>
            </li>
          </ul>
        </div>
        {/* Header Search */}
        <div className='header__wrap'>
          <div>
            <div className='header__search'>
              <input className='header__search__input' value={this.state.searchText} placeholder='Search...'
                     onChange={this.onSearchChange} onKeyDown={this.onSearchKeyDown} />
            </div>
          </div>
        </div>
        {/* Header Drop-downs */}
        <div className='header__wrap'>
          <div>
            <GameOrder onChange={this.props.onOrderChange}/>
          </div>
        </div>
        {/* Right-most portion */}
        <div className='header__wrap header__right'>
          <div>
            {/* Toggle Right Sidebar */}
            <div className='header__toggle-sidebar'
                 title={showRightSidebar ? 'Hide right sidebar' : 'Show right sidebar'}
                 onClick={this.props.onToggleRightSidebarClick}>
              <OpenIcon icon={showRightSidebar ? 'collapse-right' : 'expand-right'} />
            </div>
            {/* Toggle Left Sidebar */}
            <div className='header__toggle-sidebar'
                 title={showLeftSidebar ? 'Hide left sidebar' : 'Show left sidebar'}
                 onClick={this.props.onToggleLeftSidebarClick}>
              <OpenIcon icon={showLeftSidebar ? 'collapse-left' : 'expand-left'} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  private onSearchChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value;
    this.setState({ searchText: value });
    // "Clear" the search when the search field gets empty
    if (value === '') { this.props.onSearch('', false); }
  }

  private onSearchKeyDown(event: React.KeyboardEvent): void {
    if (event.key === 'Enter') {
      const value = this.state.searchText;
      this.props.onSearch(value, true);
      Util.easterEgg(value);
    }
  }
}
