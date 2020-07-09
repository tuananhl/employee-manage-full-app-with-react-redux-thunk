import * as React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import './pagination.scss';
import { AppConstant } from '../../utils/constant';

export default class Pagination extends React.Component<any, any> {
    state:any = {
        currentPage: 0,
        itemPerpage: AppConstant.intemPerpage,
        shouldRunPrev: false,
        shouldRunNext: true
    }

    componentWillReceiveProps(nextProps: any) {
        if((nextProps.currentPage < nextProps.totalPage) && (nextProps.currentPage > 1)) {
            this.setState({ shouldRunNext: true, shouldRunPrev: true })
        }
        if(nextProps.currentPage === nextProps.totalPage) {
            this.setState({ shouldRunNext: false, shouldRunPrev: true });
        }
        if(nextProps.currentPage <= 1) {
            this.setState({ shouldRunNext: true, shouldRunPrev: false })
        }
        if(nextProps.currentPage !== this.state.currentPage || this.props.needToReload === true) {
            this.setState({ currentPage: nextProps.currentPage });
            this.goToPage(nextProps.currentPage);
        }
    }

    goToPage(currentPage: number): void {
        this.props.loadListEmployees(currentPage)
    }

    changePage(page: number): void {
        this.props.changePageCurrent(page);
    }

    controlPage(max: number, type: string): void {
        if(type === 'prev') {
            if((this.state.currentPage - 1) <= 1) {
                this.setState({ currentPage: this.state.currentPage - 1, shouldRunPrev: false, shouldRunNext: true });
            } else {
                this.setState({ currentPage: this.state.currentPage - 1, shouldRunPrev: true, shouldRunNext: true })
            }

            this.changePage(this.state.currentPage - 1);
        }
        if(type === 'next') {
            if((this.state.currentPage + 1) < max -1) {
                this.setState({ currentPage: this.state.currentPage + 1, shouldRunNext: true, shouldRunPrev: true })
            } else {
                this.setState({ currentPage: max, shouldRunNext: false, shouldRunPrev: true });
            }
            this.changePage(this.state.currentPage + 1);
        }
    }

    renderPaginationTemplate(): any {
        const listItemPaginations: Array<number> = Array.from(Array(this.props.totalPage)).fill(null).map((x: any, i: number) => { return i; });
        if(this.props.totalPage && this.props.totalPage > 1) {
            return (
                <nav aria-label="Page navigation" className="nav-pagination">
                    <ul className="pagination justify-content-center">
                        <li className={ classnames('page-item', { 'disabled': (this.state.currentPage) <= 1 }) } onClick={ () => this.controlPage(listItemPaginations.length, 'prev') }>
                            <Link to={{ pathname: '/', search: this.state.currentPage > 1 && this.state.currentPage <= listItemPaginations.length ? '?page=' + (this.state.currentPage - 1) : '' }} className="page-link">Previous</Link></li>
                            {   listItemPaginations.map((item: any, key: number) => {
                                    return  <li
                                                onClick={ () => this.changePage(item + 1) }
                                                key={key}
                                                className={ classnames('page-item', { 'active': this.state.currentPage === (item + 1)}) }
                                            >
                                                <Link to={{ pathname: '/', search: item !== 0 ? '?page=' + (item + 1) : '' }} className="page-link">{ item + 1 }</Link>
                                            </li>
                                }) 
                            }
                        <li className={ classnames('page-item', { 'disabled': !this.state.shouldRunNext }) } onClick={ () => this.controlPage(listItemPaginations.length, 'next') }>
                            <Link to={{ pathname: '/', search: this.state.currentPage >= 1 ? '?page=' + (this.state.currentPage + 1) : '' }} className="page-link">Next</Link>
                        </li>
                    </ul>
                </nav>
            )
        } else {
            return null;
        }
    }

    render(): any {
        return this.renderPaginationTemplate();
    }
}