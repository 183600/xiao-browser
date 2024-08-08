//================================================
/*

Xiao Browser
Effortlessly open any website in your web browser's sidebar – streamline your workflow instantly!
Copyright (C) 2024 Stefan vd
www.stefanvd.net

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.


To view a copy of this license, visit http://creativecommons.org/licenses/GPL/2.0/

    本项目基于chrome-extensions-samples-main修改，并且此文件可能修改了，以下为原项目的版权声明
 Copyright 2023 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
//================================================

/* global navigation */
if(window.top !== window && window.parent === window.top){
	chrome.runtime.sendMessage({name: "sidepanelopen"}, (b) => {
		if(b){
			const origin = chrome.runtime.getURL("");
			addEventListener("hashchange", () => top.postMessage({method: "navigate", href: location.href}, origin));
			addEventListener("load", () => top.postMessage({method: "navigate", href: location.href}, origin));
			addEventListener("popstate", () => top.postMessage({method: "navigate", href: location.href}, origin));
			addEventListener("message", (e) => {
				if(e.data?.method === "navigate-verified" && e.origin.includes(chrome.runtime.id)){
					navigation.addEventListener("navigate", (e) => {
						const href = e.destination.url;
						top.postMessage({
							method: "complete",
							href
						}, origin);
					});
				}else if(e.data?.method === "changeZoomScale"){
					document.body.style.zoom = e.data.zoom;
				}else if(e.data?.method === "goBackWebpage"){
					window.history.back();
				}else if(e.data?.method === "goNextWebpage"){
					window.history.forward();
				}else if(e.data?.method == "goReloadWebpage"){
					location.reload();
				}
			});
			top.postMessage({method: "navigate", href: location.href}, origin);
		}
	});
}
