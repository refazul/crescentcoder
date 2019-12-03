import React, { useState, useRef, useEffect } from 'react';
import $ from 'jquery';

const Menu = (props) => {
	var li_class_name = "nav-item";
	var i_class_name = "";
	var item = props;
	var items = item.items || [];
	const [active, setActive] = useState(false);
	const containerRef = useRef(null);

	useEffect(() => {
		var container = $(containerRef.current);
		var submenu = $(container).find('> .nav-treeview');
		if (active) {
			$(submenu).stop().slideDown(300, () => {
				$(container).addClass('menu-open');
			});
		} else {
			$(submenu).stop().slideUp(300, () => {
				$(container).removeClass('menu-open');
			});
		}
	});

	if (items.length > 0) {
		li_class_name += " has-treeview ";
		i_class_name += " right fas fa-angle-left ";
	}
	if (item.type == "header") {
		return <li className="nav-header">{item.text}</li>
	}
	function li_onClick(e) {
		if (items.length > 0) {
			setActive(!active);
		}
	}
	return (
		<li className={li_class_name} ref={containerRef}>
			<a className="nav-link" href={item.link} onClick={li_onClick}>
				<i className={"nav-icon " + item.icon}></i>
				<p>
					{item.text}
					<i className={i_class_name}></i>
					<span className="badge badge-info right">{item.number}</span>
				</p>

			</a>
			<ul className=" nav nav-treeview ">
				{
					items.map((item) => {
						return <Menu {...item} />
					})
				}
			</ul>
		</li>
	)
};

const Sidebarmenu = (props) => {
	return (
		<aside className="main-sidebar sidebar-dark-primary elevation-4">
			<a href="index3.html" className="brand-link">
				<img src="img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3"
					style={{ opacity: .8 }} />
				<span className="brand-text font-weight-light">AdminLTE 3</span>
			</a>
			<div className="sidebar">
				<div className="user-panel mt-3 pb-3 mb-3 d-flex">
					<div className="image">
						<img src="img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
					</div>
					<div className="info">
						<a href="#" className="d-block">Alexander Pierce</a>
					</div>
				</div>
				<nav className="mt-2">
					<ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
						{
							props.items.map((item) => {
								return <Menu {...item} />
							})
						}
					</ul>
				</nav>
			</div>
		</aside>
	);
}

export default Sidebarmenu;
