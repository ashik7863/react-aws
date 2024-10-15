import React from 'react';
import { Link } from 'react-router-dom';

const StaffDashboard = () => {

    return (
        <>
            <div className="dashboard-right">
                <div className="row">
                    <div className="nav_heading">
                        <div className="col-lg-12">
                            <h5><iconify-icon icon="ic:outline-home"></iconify-icon> Dashboard</h5>
                        </div>
                    </div>
                </div> 
                <div className="row g-0">

                    <div className="col-12 col-md-12">
                        <div className="dashboard-right-end">
                            <div className="dashboard-right-content">
                                <div className="row g-3">
                                    <div className="col-12 col-md-4">
                                        <div className="dashboard-box">
                                            <div className="dashboard-box-info">
                                                <span>10</span>
                                                <h5 className="mb-0">Customer</h5>
                                            </div>
                                            <div className="dashboard_icon">
                                                <iconify-icon icon="carbon:restaurant-fine" style={{ color: 'white' }}></iconify-icon>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div className="dashboard-box dashboard-box2">
                                            <div className="dashboard-box-info">
                                                <span>300</span>
                                                <h5 className="mb-0">Menu Items</h5>
                                            </div>
                                            <div className="dashboard_icon">
                                                <iconify-icon icon="ic:twotone-menu-book" style={{ color: 'white' }}></iconify-icon>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div className="dashboard-box dashboard-box3">
                                            <div className="dashboard-box-info">
                                                <span>300</span>
                                                <h5 className="mb-0">Orders</h5>
                                            </div>
                                            <div className="dashboard_icon">
                                                <iconify-icon icon="material-symbols-light:order-approve-outline-rounded"></iconify-icon>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-0">
                    <div className="col-12 col-md-12">
                        <div className="ongoing_courses_sec">
                            <div className="row g-0">

                                <div class="dashboard-card" id="table-card">
                                    <div class="dashboard-card-heading">
                                        <div className="tb-heading">
                                            <h5 class="mb-0"> <iconify-icon icon="hugeicons:menu-restaurant"></iconify-icon>Customer List</h5>
                                        </div>
                                        <div class="dashboard-card-heading-right">

                                        </div>
                                    </div>
                                    
                                    <div className="data-searc-se">
                                        <div className="opp-othe">
                                            <div className="gorups-btn">
                                                <Link to="" className="btns"><iconify-icon icon="cil:copy"></iconify-icon></Link>
                                                <Link to="" className="btns"><iconify-icon icon="uiw:file-excel"></iconify-icon></Link>
                                                <Link to="" className="btns"><iconify-icon icon="uil:file-alt"></iconify-icon></Link>
                                                <Link to="" className="btns"><iconify-icon icon="formkit:filepdf"></iconify-icon></Link>
                                                <Link to="" className="btns"><iconify-icon icon="cil:print"></iconify-icon></Link>
                                            </div>
                                        </div>
                                        <div className="serac-box">
                                            <div className="search">
                                                <form action="">
                                                    <input type="text" placeholder="Search Here" fdprocessedid="txryov" />
                                                    <button type="submit" fdprocessedid="eeeawr">
                                                        <iconify-icon icon="ic:baseline-search" />
                                                    </button>
                                                </form>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="dashboard-card-info">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Name.</th>
                                                        <th>Address</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td className="">
                                                            <span className="car-badge">The Gourmet Bistro</span>
                                                        </td>
                                                        <td>1234 Culinary Lane, Foodtown</td>
                                                        <td className="">
                                                            <span className="status green">Open</span>
                                                        </td>
                                                        <td className="">
                                                            <div className="buttn_grop">
                                                                <button className="action-btn" type="button">
                                                                    <iconify-icon icon="hugeicons:view" />
                                                                </button>
                                                                <button className="action-btn" type="button">
                                                                    <iconify-icon icon="ph:arrow-circle-right-thin" />
                                                                </button>
                                                                <button className="action-danger" type="button">
                                                                    <iconify-icon icon="material-symbols-light:delete-outline" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td className="">
                                                            <span className="car-badge">Bistro Delight</span>
                                                        </td>
                                                        <td>5678 Flavor Road, Tastecity</td>
                                                        <td className="">
                                                            <span className="status green">Open</span>
                                                        </td>
                                                        <td className="">
                                                            <div className="buttn_grop">
                                                                <button className="action-btn" type="button">
                                                                    <iconify-icon icon="hugeicons:view" />
                                                                </button>
                                                                <button className="action-btn">
                                                                    <iconify-icon icon="ph:arrow-circle-right-thin" />
                                                                </button>
                                                                <button className="action-danger">
                                                                    <iconify-icon icon="material-symbols-light:delete-outline" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td className="">
                                                            <span className="car-badge">Cuisine Central</span>
                                                        </td>
                                                        <td>9101 Gourmet Street, Dineville</td>
                                                        <td className="">
                                                            <span className="status red">Closed</span>
                                                        </td>
                                                        <td className="">
                                                            <div className="buttn_grop">
                                                                <button className="action-btn" type="button">
                                                                    <iconify-icon icon="hugeicons:view" />
                                                                </button>
                                                                <button className="action-btn">
                                                                    <iconify-icon icon="ph:arrow-circle-right-thin" />
                                                                </button>
                                                                <button className="action-danger">
                                                                    <iconify-icon icon="material-symbols-light:delete-outline" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td className="">
                                                            <span className="car-badge">Flavor Fusion</span>
                                                        </td>
                                                        <td>1122 Spice Avenue, Delicetown</td>
                                                        <td className="">
                                                            <span className="status green">Open</span>
                                                        </td>
                                                        <td className="">
                                                            <div className="buttn_grop">
                                                                <button className="action-btn" type="button">
                                                                    <iconify-icon icon="hugeicons:view" />
                                                                </button>
                                                                <button className="action-btn">
                                                                    <iconify-icon icon="ph:arrow-circle-right-thin" />
                                                                </button>
                                                                <button className="action-danger">
                                                                    <iconify-icon icon="material-symbols-light:delete-outline" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td className="">
                                                            <span className="car-badge">Taste Temptations</span>
                                                        </td>
                                                        <td>3344 Savory Blvd, Gastronomy</td>
                                                        <td className="">
                                                            <span className="status yellow">Pending</span>
                                                        </td>
                                                        <td className="">
                                                            <div className="buttn_grop">
                                                                <button className="action-btn" type="button">
                                                                    <iconify-icon icon="hugeicons:view" />
                                                                </button>
                                                                <button className="action-btn">
                                                                    <iconify-icon icon="ph:arrow-circle-right-thin" />
                                                                </button>
                                                                <button className="action-danger">
                                                                    <iconify-icon icon="material-symbols-light:delete-outline" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* 
            <div className="row g-0">
                <div className="col-12 col-md-3">
                    <div className="dashboard-right-left">
                        <div className="dashboard-right-left-heading">
                            <h5 className="mb-1">Your Transaction</h5>
                        </div>

                        <div className="dashboard-card">
                            <div className="dashboard-card-header">
                                <span>expenses</span>
                                <div className="badgee">today</div>
                            </div>

                            <div className="dashboard-card-info">
                                <div className="income-abs income-abs-success">
                                    <span>-1.5%</span>
                                </div>
                                <h4 className="mb-1">$ 5660.00</h4>
                                <p>Compared to $9940 yesterday</p>
                            </div>

                            <div className="dashboard-card-footer">
                                <span>Last week Income</span>
                                <div className="amount">$25658.00</div>
                            </div>
                        </div>

                        <div className="dashboard-card">
                            <div className="dashboard-card-header">
                                <span>Hire vs Cancel</span>
                                <div className="badgee">today</div>
                            </div>

                            <div className="dashboard-card-info">
                                <div className="income-abs income-abs-danger">
                                    <span>-1.5%</span>
                                </div>
                                <h4 className="mb-1">$ 5660.00</h4>
                                <p>Compared to $9940 yesterday</p>
                            </div>

                            <div className="dashboard-card-footer">
                                <span>Last week Income</span>
                                <div className="amount">$25658.00</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-9 col-12">
                    <div className="upcoming_seminer_sec">
                        <div className="row">
                            <div className="col-12">
                                <div className="dashboard-right-heading">
                                    <div className="dashboard-right-left-heading">
                                        <h5 className="mb-1">Past Seminer</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="dashboard_right_content">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="dashboard-card mb-0 border_sty">
                                            <div className="dashboard-card-header">
                                                <span>
                                                    <img src="assets/imgs/html-img.jpg" alt="" />
                                                </span>
                                                <div className="badgee">
                                                    <h6>HTML, CSS</h6>
                                                    <p className="mb-0">
                                                        Module User Experience Research (UX Research)
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="dashboard-card-info">
                                                <div className="progress">
                                                    <div className="progress-bar bg_info" role="progressbar" style={{ width: '50%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <p>You've learned 4 models from 14</p>
                                            </div>

                                            <div className="dashboard-card-footer">
                                                <a href="" className="btn-grad">Continue to Study</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="dashboard-card mb-0 border_sty">
                                            <div className="dashboard-card-header">
                                                <span>
                                                    <img src="assets/imgs/ux-img.jpg" alt="" />
                                                </span>
                                                <div className="badgee">
                                                    <h6>UX/UI Interface Design</h6>
                                                    <p className="mb-0">
                                                        Module User Experience Research (UX Research)
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="dashboard-card-info">
                                                <div className="progress">
                                                    <div className="progress-bar bg_info" role="progressbar" style={{ width: '50%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <p>You've learned 4 models from 14</p>
                                            </div>

                                            <div className="dashboard-card-footer">
                                                <a href="" className="btn-grad">Continue to Study</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            </div>
        </>
    )
}

export default StaffDashboard;