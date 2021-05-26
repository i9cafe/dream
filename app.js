'use strict';

const app = angular.module('dream', ['ngRoute', 'ui.bootstrap'])

	.controller('MainController', [
		'$scope',
		'$modal',
		function($scope, $modal) {

			/*************************** DEFAULT INFO SETUP ***************************/
			const vm = this;

			vm.modeFlag = false;

			/*************************** DEBUGGING MODE ***************************/
			const debug = false; // true or false.

			/*************************** NUMBER SETTING ***************************/
			const standard_Array = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

			const sub_Array = [];

			const sub_Array_1 = [1, 13, 25, 37];
			const sub_Array_2 = [2, 14, 26, 38];
			const sub_Array_3 = [3, 15, 27, 39];
			const sub_Array_4 = [4, 16, 28, 40];
			const sub_Array_5 = [5, 17, 29, 41];
			const sub_Array_6 = [6, 18, 30, 42];
			const sub_Array_7 = [7, 19, 31, 43];
			const sub_Array_8 = [8, 20, 32, 44];
			const sub_Array_9 = [9, 21, 33, 45];
			const sub_Array_10 = [10, 22, 34];
			const sub_Array_11 = [11, 23, 35];
			const sub_Array_12 = [12, 24, 36];

			sub_Array.push(sub_Array_1);
			sub_Array.push(sub_Array_2);
			sub_Array.push(sub_Array_3);
			sub_Array.push(sub_Array_4);
			sub_Array.push(sub_Array_5);
			sub_Array.push(sub_Array_6);
			sub_Array.push(sub_Array_7);
			sub_Array.push(sub_Array_8);
			sub_Array.push(sub_Array_9);
			sub_Array.push(sub_Array_10);
			sub_Array.push(sub_Array_11);
			sub_Array.push(sub_Array_12);

			const standard_Object = standard_Array.reduce((result, curr, index) => {
				result[curr] = sub_Array[index];
				return result;
			}, {});

			__debug_info('번호 전개도', standard_Object);

			/*************************** FUNCTION LIST ***************************/

			function __debug_info() {
				const self = arguments;
				debug ? (function() {
					const args = Array.from(self);
					args.unshift('DEBUG');
					console.info.apply(null, args);
				}()) : 0;
			}

			// 중복 모드 변경
			this.changeMode = () => {
				__debug_info('중복 허용 모드', vm.modeFlag);
			};

			// 리셋
			this.reset = () => {
				vm.except_Array = [];
				vm.selectedBalls = [];
				vm.result = [];
				vm.all_Cases = [];
				vm.description = '';
				vm.selectedData = [];

				vm.ballState_1 = 'Y';
				vm.ballState_2 = 'Y';
				vm.ballState_3 = 'Y';
				vm.ballState_4 = 'Y';
				vm.ballState_5 = 'Y';
				vm.ballState_6 = 'Y';
				vm.ballState_7 = 'Y';
				vm.ballState_8 = 'Y';
				vm.ballState_9 = 'Y';
				vm.ballState_10 = 'Y';
				vm.ballState_11 = 'Y';
				vm.ballState_12 = 'Y';

				vm.fixBallYn_1 = 'N';
				vm.fixBallYn_2 = 'N';
				vm.fixBallYn_3 = 'N';
				vm.fixBallYn_4 = 'N';
				vm.fixBallYn_5 = 'N';
				vm.fixBallYn_6 = 'N';
			};

			// 6개 공 뽑기
			this.selectSixBalls = (except_Array = []) => {

				function getRamdomInt(min = 1, max = 12) {
					min = Math.ceil(min);
					max = Math.floor(max);
					return Math.floor(Math.random() * (max - min + 1)) + min;
				}

				function getSixBalls() {

					let temp = [];

					while (temp.length < 6) {
						// 1. 랜덤 추출
						const randomInt = getRamdomInt();
						temp.push(randomInt);

						// 제외할 번호 선택 시.
						if (except_Array.length > 0) {
							let findIndex = except_Array.findIndex(x => x === temp[temp.length - 1]);
							(findIndex > -1) && temp.pop();
						}

						// 지정 번호 선택 시.
						if (vm.selectedData.length > 0) {
							let findIndex = vm.selectedData.findIndex(x => x === temp[temp.length - 1]);
							(findIndex > -1) && temp.pop();
						}

						// 2. 중복 제거
						//temp = [...new Set(temp)];
					};

					// 지정 모달에서 띠를 순서 지정한 경우
					if (vm.selectedData && vm.selectedData.length >= 0) {
						let selectedData = angular.copy(vm.selectedData);

						for (let i = 0; i < temp.length; i++) {
							let findIndex = selectedData.findIndex(x => x !== undefined && x !== null && x !== '');
							if (findIndex > -1) {
								temp[findIndex] = selectedData[findIndex];
								selectedData[findIndex] = null;
							}
						}
					};

					return temp;
				};

				function getCountArray(balls) {

					const count_Object = balls.reduce((acc, curr) =>
						({
							...acc,
							[curr]: (acc[curr] || 0) + 1
						}), {});

					const count_Array = Object.values(count_Object);

					return count_Array;
				};


				let balls = getSixBalls();
				let count_Array = getCountArray(balls);
				__debug_info(balls);
				__debug_info(count_Array);

				let i = 0;
				while (i < 100000) {

					let findIndex;

					if (vm.modeFlag === true) {
						// 같은 숫자가 3개 이상 있을 때
						findIndex = count_Array.findIndex(x => x > 2);
						if (findIndex > -1) {
							__debug_info('같은 번호가 3개 이상 추출되어 다시 실행합니다.');
							balls = getSixBalls();
							count_Array = getCountArray(balls);
							__debug_info(balls);
							__debug_info(count_Array);
						}
					} else {

						findIndex = count_Array.findIndex(x => x > 1);
						if (findIndex > -1) {
							__debug_info('같은 번호가 중복 선택되어 다시 실행합니다.');
							balls = getSixBalls();
							count_Array = getCountArray(balls);
							__debug_info(balls);
							__debug_info(count_Array);
						}
					}

					// 하나의 숫자에 대해 중복이 2회 이상 있을 때
					const count_Object_Finally = count_Array.reduce((acc, curr) =>
						({
							...acc,
							[curr]: (acc[curr] || 0) + 1
						}), {});

					if (count_Object_Finally['2'] && count_Object_Finally['2'] > 1) {
						__debug_info('하나의 숫자에 대한 중복이 2회 이상 발생하여 다시 실행합니다.');
						balls = getSixBalls();
						count_Array = getCountArray(balls);
						__debug_info(balls);
						__debug_info(count_Array);
					}

					i += 1;

					if ((findIndex <= -1) && (count_Object_Finally['2'] && count_Object_Finally['2'] <= 1)) {
						break;
					}
				};

				return balls;
			};


			this.execute = () => {

				if (vm.selectedData[0] !== undefined && vm.selectedData[0] !== null && vm.selectedData[0] !== '') {
					vm.fixBallYn_1 = 'Y';
				} else if (vm.selectedData[0] === undefined || vm.selectedData[0] === null || vm.selectedData[0] === '') {
					vm.fixBallYn_1 = 'N';
				}

				if (vm.selectedData[1] !== undefined && vm.selectedData[1] !== null && vm.selectedData[1] !== '') {
					vm.fixBallYn_2 = 'Y';
				} else if (vm.selectedData[1] === undefined || vm.selectedData[1] === null || vm.selectedData[1] === '') {
					vm.fixBallYn_2 = 'N';
				}

				if (vm.selectedData[2] !== undefined && vm.selectedData[2] !== null && vm.selectedData[2] !== '') {
					vm.fixBallYn_3 = 'Y';
				} else if (vm.selectedData[2] === undefined || vm.selectedData[2] === null || vm.selectedData[2] === '') {
					vm.fixBallYn_3 = 'N';
				}

				if (vm.selectedData[3] !== undefined && vm.selectedData[3] !== null && vm.selectedData[3] !== '') {
					vm.fixBallYn_4 = 'Y';
				} else if (vm.selectedData[3] === undefined || vm.selectedData[3] === null || vm.selectedData[3] === '') {
					vm.fixBallYn_4 = 'N';
				}

				if (vm.selectedData[4] !== undefined && vm.selectedData[4] !== null && vm.selectedData[4] !== '') {
					vm.fixBallYn_5 = 'Y';
				} else if (vm.selectedData[4] === undefined || vm.selectedData[4] === null || vm.selectedData[4] === '') {
					vm.fixBallYn_5 = 'N';
				}

				if (vm.selectedData[5] !== undefined && vm.selectedData[5] !== null && vm.selectedData[5] !== '') {
					vm.fixBallYn_6 = 'Y';
				} else if (vm.selectedData[5] === undefined || vm.selectedData[5] === null || vm.selectedData[5] === '') {
					vm.fixBallYn_6 = 'N';
				}

				const except_Array = angular.copy(vm.except_Array); // '제외' 기능
				__debug_info('제외한 번호 리스트', except_Array);

				const selectedBalls = vm.selectSixBalls(except_Array); //.sort((a, b) => (a > b) ? 1 : (a < b) ? -1 : 0);
				vm.selectedBalls = angular.copy(selectedBalls);
				__debug_info('1 ~ 12 중 랜덤 추출 6개', vm.selectedBalls);

				vm.result = angular.copy(vm.selectedBalls);

				for (let i = 0; i < vm.result.length; i++) {
					switch (vm.result[i]) {
						case 1:
							vm.result[i] = '자';
							break;

						case 2:
							vm.result[i] = '축';
							break;

						case 3:
							vm.result[i] = '인';
							break;

						case 4:
							vm.result[i] = '묘';
							break;

						case 5:
							vm.result[i] = '진';
							break;

						case 6:
							vm.result[i] = '사';
							break;

						case 7:
							vm.result[i] = '오';
							break;

						case 8:
							vm.result[i] = '미';
							break;

						case 9:
							vm.result[i] = '신';
							break;

						case 10:
							vm.result[i] = '유';
							break;

						case 11:
							vm.result[i] = '술';
							break;

						case 12:
							vm.result[i] = '해';
							break;
					}
				};

				const selected_Object = selectedBalls.reduce((result, curr) => {
					result[curr] = sub_Array[curr - 1];
					return result;
				}, {});

				const selected_Array = [];

				for (let [index, value] of selectedBalls.entries()) {
					selected_Array[index] = sub_Array[selectedBalls[index] - 1];
				}

				const all_Cases = []; // 모든 경우의 수

				for (let i = 0; i < selected_Array[0].length; i++) {
					for (let j = 0; j < selected_Array[1].length; j++) {

						if (selected_Array[0][i] < selected_Array[1][j]) {
							for (let k = 0; k < selected_Array[2].length; k++) {

								if (selected_Array[1][j] < selected_Array[2][k]) {
									for (let l = 0; l < selected_Array[3].length; l++) {

										if (selected_Array[2][k] < selected_Array[3][l]) {
											for (let m = 0; m < selected_Array[4].length; m++) {

												if (selected_Array[3][l] < selected_Array[4][m]) {
													for (let n = 0; n < selected_Array[5].length; n++) {

														if (selected_Array[4][m] < selected_Array[5][n]) {

															let temp = [];

															temp.push(selected_Array[0][i]);
															temp.push(selected_Array[1][j]);
															temp.push(selected_Array[2][k]);
															temp.push(selected_Array[3][l]);
															temp.push(selected_Array[4][m]);
															temp.push(selected_Array[5][n]);

															all_Cases.push(temp);
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				};

				__debug_info(`모든 경우의 수는 ${all_Cases.length}가지 입니다.`);
				__debug_info('모든 경우의 수', all_Cases);
				vm.all_Cases = angular.copy(all_Cases);
				vm.description = `모든 조합의 수: ${vm.all_Cases.length}`;
			};

			function removeNumber(number) {
				const idx = vm.except_Array.indexOf(number);
				(idx > -1) && vm.except_Array.splice(idx, 1);
			}

			this.changeBallState_1 = () => {
				if (vm.ballState_1 === 'Y') {
					vm.ballState_1 = 'N';
					vm.except_Array.push(1);
				} else if (vm.ballState_1 === 'N') {
					vm.ballState_1 = 'Y';
					removeNumber(1);
				}
			};

			this.changeBallState_2 = () => {
				if (vm.ballState_2 === 'Y') {
					vm.ballState_2 = 'N';
					vm.except_Array.push(2);
				} else if (vm.ballState_2 === 'N') {
					vm.ballState_2 = 'Y';
					removeNumber(2);
				}
			};

			this.changeBallState_3 = () => {
				if (vm.ballState_3 === 'Y') {
					vm.ballState_3 = 'N';
					vm.except_Array.push(3);
				} else if (vm.ballState_3 === 'N') {
					vm.ballState_3 = 'Y';
					removeNumber(3);
				}
			};

			this.changeBallState_4 = () => {
				if (vm.ballState_4 === 'Y') {
					vm.ballState_4 = 'N';
					vm.except_Array.push(4);
				} else if (vm.ballState_4 === 'N') {
					vm.ballState_4 = 'Y';
					removeNumber(4);
				}
			};

			this.changeBallState_5 = () => {
				if (vm.ballState_5 === 'Y') {
					vm.ballState_5 = 'N';
					vm.except_Array.push(5);
				} else if (vm.ballState_5 === 'N') {
					vm.ballState_5 = 'Y';
					removeNumber(5);
				}
			};

			this.changeBallState_6 = () => {
				if (vm.ballState_6 === 'Y') {
					vm.ballState_6 = 'N';
					vm.except_Array.push(6);
				} else if (vm.ballState_6 === 'N') {
					vm.ballState_6 = 'Y';
					removeNumber(6);
				}
			};

			this.changeBallState_7 = () => {
				if (vm.ballState_7 === 'Y') {
					vm.ballState_7 = 'N';
					vm.except_Array.push(7);
				} else if (vm.ballState_7 === 'N') {
					vm.ballState_7 = 'Y';
					removeNumber(7);
				}
			};

			this.changeBallState_8 = () => {
				if (vm.ballState_8 === 'Y') {
					vm.ballState_8 = 'N';
					vm.except_Array.push(8);
				} else if (vm.ballState_8 === 'N') {
					vm.ballState_8 = 'Y';
					removeNumber(8);
				}
			};

			this.changeBallState_9 = () => {
				if (vm.ballState_9 === 'Y') {
					vm.ballState_9 = 'N';
					vm.except_Array.push(9);
				} else if (vm.ballState_9 === 'N') {
					vm.ballState_9 = 'Y';
					removeNumber(9);
				}
			};

			this.changeBallState_10 = () => {
				if (vm.ballState_10 === 'Y') {
					vm.ballState_10 = 'N';
					vm.except_Array.push(10);
				} else if (vm.ballState_10 === 'N') {
					vm.ballState_10 = 'Y';
					removeNumber(10);
				}
			};

			this.changeBallState_11 = () => {
				if (vm.ballState_11 === 'Y') {
					vm.ballState_11 = 'N';
					vm.except_Array.push(11);
				} else if (vm.ballState_11 === 'N') {
					vm.ballState_11 = 'Y';
					removeNumber(11);
				}
			};

			this.changeBallState_12 = () => {
				if (vm.ballState_12 === 'Y') {
					vm.ballState_12 = 'N';
					vm.except_Array.push(12);
				} else if (vm.ballState_12 === 'N') {
					vm.ballState_12 = 'Y';
					removeNumber(12);
				}
			};

			this.showAllCases = () => {

				if (vm.all_Cases.length <= 0) {
					return;
				}

				function openModal() {
					return $modal.open({
						templateUrl: 'modal.html',
						windowClass: 'modal-fullscreen',
						controller: 'SubController',
						controllerAs: 'self',
						backdrop: 'static',
						size: 'sm',
						resolve: {
							parameters: () => {
								return {
									data: vm.all_Cases,
								};
							}
						}
					});
				}

				openModal().result.then(result => {

				}, cancel => {

				});
			};

			this.fixBalls = () => {

				function openModal() {
					return $modal.open({
						templateUrl: 'setting.html',
						windowClass: 'modal-fullscreen',
						controller: 'SettingController',
						controllerAs: 'self',
						backdrop: 'static',
						size: 'sm',
						resolve: {
							parameters: () => {
								return {
									data: vm.selectedData || [],
									modeFlag: vm.modeFlag
								};
							}
						}
					});
				}

				openModal().result.then(result => {

					vm.selectedData = angular.copy(result.data);

					for (let i = 0; i < vm.selectedData.length; i++) {
						switch (vm.selectedData[i]) {
							case '자':
								vm.selectedData[i] = 1;
								break;

							case '축':
								vm.selectedData[i] = 2;
								break;

							case '인':
								vm.selectedData[i] = 3;
								break;

							case '묘':
								vm.selectedData[i] = 4;
								break;

							case '진':
								vm.selectedData[i] = 5;
								break;

							case '사':
								vm.selectedData[i] = 6;
								break;

							case '오':
								vm.selectedData[i] = 7;
								break;

							case '미':
								vm.selectedData[i] = 8;
								break;

							case '신':
								vm.selectedData[i] = 9;
								break;

							case '유':
								vm.selectedData[i] = 10;
								break;

							case '술':
								vm.selectedData[i] = 11;
								break;

							case '해':
								vm.selectedData[i] = 12;
								break;
						}
					};

					__debug_info('순서를 지정한 리스트', vm.selectedData);

				}, cancel => {

				});
			};

			/*************************** START ***************************/
			vm.reset();

		}
	])

	.controller('SubController', [
		'$scope',
		'$modalInstance',
		'parameters',
		function($scope, $modalInstance, parameters) {

			/*************************** DEFAULT INFO SETUP ***************************/
			const self = this;

			self.parameters = angular.copy(parameters) || {};

			$scope.lists = angular.copy(self.parameters.data);

		}
	])

	.controller('LoginController', [
		'$scope',
		function($scope) {

			/*************************** DEFAULT INFO SETUP ***************************/
			const vm = this;

			const USER_ID = 'asdf';
			const USER_PW = 1203;

			/*************************** FUNCTION LIST ***************************/
			this.checkForm = () => {

				const id = document.getElementById("id");
				const pw = document.getElementById("pw");

				if (String(id.value).toLowerCase() !== USER_ID || Number(pw.value) !== USER_PW) {

					alert("로그인 정보가 일치하지 않습니다.");
					return;

				} else {
					location.href = "menu.html";
				}
			};

		}
	])

	.controller('SettingController', [
		'$scope',
		'$modalInstance',
		'$timeout',
		'parameters',
		function($scope, $modalInstance, $timeout, parameters) {

			/*************************** DEFAULT INFO SETUP ***************************/
			const self = this;

			self.parameters = angular.copy(parameters) || {};

			$scope.list_12 = [{
				code: 1,
				name: '자',
			}, {
				code: 2,
				name: '축',
			}, {
				code: 3,
				name: '인',
			}, {
				code: 4,
				name: '묘',
			}, {
				code: 5,
				name: '진',
			}, {
				code: 6,
				name: '사',
			}, {
				code: 7,
				name: '오',
			}, {
				code: 8,
				name: '미',
			}, {
				code: 9,
				name: '신',
			}, {
				code: 10,
				name: '유',
			}, {
				code: 11,
				name: '술',
			}, {
				code: 12,
				name: '해',
			}];

			/*************************** FUNCTION LIST ***************************/

			// 적용
			$scope.apply = () => {

				let selectedElement_1 = document.getElementById("select-1");
				let selectedData_1 = selectedElement_1.options[selectedElement_1.selectedIndex].label;

				let selectedElement_2 = document.getElementById("select-2");
				let selectedData_2 = selectedElement_2.options[selectedElement_2.selectedIndex].label;

				let selectedElement_3 = document.getElementById("select-3");
				let selectedData_3 = selectedElement_3.options[selectedElement_3.selectedIndex].label;

				let selectedElement_4 = document.getElementById("select-4");
				let selectedData_4 = selectedElement_4.options[selectedElement_4.selectedIndex].label;

				let selectedElement_5 = document.getElementById("select-5");
				let selectedData_5 = selectedElement_5.options[selectedElement_5.selectedIndex].label;

				let selectedElement_6 = document.getElementById("select-6");
				let selectedData_6 = selectedElement_6.options[selectedElement_6.selectedIndex].label;

				self.selectedData = [];

				self.selectedData[0] = selectedData_1;
				self.selectedData[1] = selectedData_2;
				self.selectedData[2] = selectedData_3;
				self.selectedData[3] = selectedData_4;
				self.selectedData[4] = selectedData_5;
				self.selectedData[5] = selectedData_6;

				const result = {
					data: self.selectedData,
				};

				const checkSelectedData = angular.copy(self.selectedData);

				for (let i = 0; i < 6; i++) {
					let findIndex = checkSelectedData.findIndex(x => x === undefined || x === null || x === '');
					if (findIndex > -1) {
						checkSelectedData.splice(findIndex, 1);
					}
				};

				const count_Object = checkSelectedData.reduce((acc, curr) =>
					({
						...acc,
						[curr]: (acc[curr] || 0) + 1
					}), {});

				const count_Array = Object.values(count_Object);

				if (self.parameters?.modeFlag === true) {

					let findIndex = count_Array.findIndex(x => x > 2);
					if (findIndex > -1) {
						alert('같은 띠를 3개 이상 선택할 수 없습니다.');
						return;
					}

				} else {

					let findIndex = count_Array.findIndex(x => x > 1);
					if (findIndex > -1) {
						alert('같은 띠를 중복하여 선택할 수 없습니다.');
						return;
					}
				}

				// 하나의 숫자에 대해 중복이 2회 이상 있을 때
				const count_Object_Finally = count_Array.reduce((acc, curr) =>
					({
						...acc,
						[curr]: (acc[curr] || 0) + 1
					}), {});

				if (count_Object_Finally['2'] && count_Object_Finally['2'] > 1) {
					alert('띠에 대한 중복은 한 번만 허용됩니다.');
					return;
				}

				$modalInstance.close(result);
			};

			/*************************** START ***************************/
			$timeout(() => {

				if (self.parameters?.data?.length < 0) {
					return;
				}

				$scope.selectedData_1 = self.parameters.data[0];
				$scope.selectedData_2 = self.parameters.data[1];
				$scope.selectedData_3 = self.parameters.data[2];
				$scope.selectedData_4 = self.parameters.data[3];
				$scope.selectedData_5 = self.parameters.data[4];
				$scope.selectedData_6 = self.parameters.data[5];

			}, 100);

		}
	])

	.controller('RevisionController', [
		'$scope',
		'$modal',
		function($scope, $modal) {

			/*************************** DEFAULT INFO SETUP ***************************/
			const vm = this;

			/*************************** DEBUGGING MODE ***************************/
			const debug = false; // true or false.

			function __debug_info() {
				const self = arguments;
				debug ? (function() {
					const args = Array.from(self);
					args.unshift('DEBUG');
					console.info.apply(null, args);
				}()) : 0;
			}

			/*************************** FUNCTION LIST ***************************/
			this.sorting = (params) => {
				return params.sort((a, b) => a > b ? 1 : a < b ? -1 : 0);
			};

			this.changeBox1UseAt = () => {
				if (vm.box1UseAt === 'Y') {
					vm.box1UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 1);
				} else if (vm.box1UseAt === 'N') {
					vm.box1UseAt = 'Y';
					vm.originalList.push(1);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox2UseAt = () => {
				if (vm.box2UseAt === 'Y') {
					vm.box2UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 2);
				} else if (vm.box2UseAt === 'N') {
					vm.box2UseAt = 'Y';
					vm.originalList.push(2);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox3UseAt = () => {
				if (vm.box3UseAt === 'Y') {
					vm.box3UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 3);
				} else if (vm.box3UseAt === 'N') {
					vm.box3UseAt = 'Y';
					vm.originalList.push(3);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox4UseAt = () => {
				if (vm.box4UseAt === 'Y') {
					vm.box4UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 4);
				} else if (vm.box4UseAt === 'N') {
					vm.box4UseAt = 'Y';
					vm.originalList.push(4);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox5UseAt = () => {
				if (vm.box5UseAt === 'Y') {
					vm.box5UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 5);
				} else if (vm.box5UseAt === 'N') {
					vm.box5UseAt = 'Y';
					vm.originalList.push(5);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox6UseAt = () => {
				if (vm.box6UseAt === 'Y') {
					vm.box6UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 6);
				} else if (vm.box6UseAt === 'N') {
					vm.box6UseAt = 'Y';
					vm.originalList.push(6);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox7UseAt = () => {
				if (vm.box7UseAt === 'Y') {
					vm.box7UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 7);
				} else if (vm.box7UseAt === 'N') {
					vm.box7UseAt = 'Y';
					vm.originalList.push(7);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox8UseAt = () => {
				if (vm.box8UseAt === 'Y') {
					vm.box8UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 8);
				} else if (vm.box8UseAt === 'N') {
					vm.box8UseAt = 'Y';
					vm.originalList.push(8);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox9UseAt = () => {
				if (vm.box9UseAt === 'Y') {
					vm.box9UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 9);
				} else if (vm.box9UseAt === 'N') {
					vm.box9UseAt = 'Y';
					vm.originalList.push(9);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox10UseAt = () => {
				if (vm.box10UseAt === 'Y') {
					vm.box10UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 10);
				} else if (vm.box10UseAt === 'N') {
					vm.box10UseAt = 'Y';
					vm.originalList.push(10);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox11UseAt = () => {
				if (vm.box11UseAt === 'Y') {
					vm.box11UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 11);
				} else if (vm.box11UseAt === 'N') {
					vm.box11UseAt = 'Y';
					vm.originalList.push(11);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox12UseAt = () => {
				if (vm.box12UseAt === 'Y') {
					vm.box12UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 12);
				} else if (vm.box12UseAt === 'N') {
					vm.box12UseAt = 'Y';
					vm.originalList.push(12);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox13UseAt = () => {
				if (vm.box13UseAt === 'Y') {
					vm.box13UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 13);
				} else if (vm.box13UseAt === 'N') {
					vm.box13UseAt = 'Y';
					vm.originalList.push(13);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox14UseAt = () => {
				if (vm.box14UseAt === 'Y') {
					vm.box14UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 14);
				} else if (vm.box14UseAt === 'N') {
					vm.box14UseAt = 'Y';
					vm.originalList.push(14);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox15UseAt = () => {
				if (vm.box15UseAt === 'Y') {
					vm.box15UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 15);
				} else if (vm.box15UseAt === 'N') {
					vm.box15UseAt = 'Y';
					vm.originalList.push(15);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox16UseAt = () => {
				if (vm.box16UseAt === 'Y') {
					vm.box16UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 16);
				} else if (vm.box16UseAt === 'N') {
					vm.box16UseAt = 'Y';
					vm.originalList.push(16);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox17UseAt = () => {
				if (vm.box17UseAt === 'Y') {
					vm.box17UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 17);
				} else if (vm.box17UseAt === 'N') {
					vm.box17UseAt = 'Y';
					vm.originalList.push(17);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox18UseAt = () => {
				if (vm.box18UseAt === 'Y') {
					vm.box18UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 18);
				} else if (vm.box18UseAt === 'N') {
					vm.box18UseAt = 'Y';
					vm.originalList.push(18);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox19UseAt = () => {
				if (vm.box19UseAt === 'Y') {
					vm.box19UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 19);
				} else if (vm.box19UseAt === 'N') {
					vm.box19UseAt = 'Y';
					vm.originalList.push(19);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox20UseAt = () => {
				if (vm.box20UseAt === 'Y') {
					vm.box20UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 20);
				} else if (vm.box20UseAt === 'N') {
					vm.box20UseAt = 'Y';
					vm.originalList.push(20);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox21UseAt = () => {
				if (vm.box21UseAt === 'Y') {
					vm.box21UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 21);
				} else if (vm.box21UseAt === 'N') {
					vm.box21UseAt = 'Y';
					vm.originalList.push(21);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox22UseAt = () => {
				if (vm.box22UseAt === 'Y') {
					vm.box22UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 22);
				} else if (vm.box22UseAt === 'N') {
					vm.box22UseAt = 'Y';
					vm.originalList.push(22);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox23UseAt = () => {
				if (vm.box23UseAt === 'Y') {
					vm.box23UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 23);
				} else if (vm.box23UseAt === 'N') {
					vm.box23UseAt = 'Y';
					vm.originalList.push(23);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox24UseAt = () => {
				if (vm.box24UseAt === 'Y') {
					vm.box24UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 24);
				} else if (vm.box24UseAt === 'N') {
					vm.box24UseAt = 'Y';
					vm.originalList.push(24);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox25UseAt = () => {
				if (vm.box25UseAt === 'Y') {
					vm.box25UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 25);
				} else if (vm.box25UseAt === 'N') {
					vm.box25UseAt = 'Y';
					vm.originalList.push(25);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox26UseAt = () => {
				if (vm.box26UseAt === 'Y') {
					vm.box26UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 26);
				} else if (vm.box26UseAt === 'N') {
					vm.box26UseAt = 'Y';
					vm.originalList.push(26);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox27UseAt = () => {
				if (vm.box27UseAt === 'Y') {
					vm.box27UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 27);
				} else if (vm.box27UseAt === 'N') {
					vm.box27UseAt = 'Y';
					vm.originalList.push(27);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox28UseAt = () => {
				if (vm.box28UseAt === 'Y') {
					vm.box28UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 28);
				} else if (vm.box28UseAt === 'N') {
					vm.box28UseAt = 'Y';
					vm.originalList.push(28);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox29UseAt = () => {
				if (vm.box29UseAt === 'Y') {
					vm.box29UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 29);
				} else if (vm.box29UseAt === 'N') {
					vm.box29UseAt = 'Y';
					vm.originalList.push(29);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox30UseAt = () => {
				if (vm.box30UseAt === 'Y') {
					vm.box30UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 30);
				} else if (vm.box30UseAt === 'N') {
					vm.box30UseAt = 'Y';
					vm.originalList.push(30);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox31UseAt = () => {
				if (vm.box31UseAt === 'Y') {
					vm.box31UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 31);
				} else if (vm.box31UseAt === 'N') {
					vm.box31UseAt = 'Y';
					vm.originalList.push(31);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox32UseAt = () => {
				if (vm.box32UseAt === 'Y') {
					vm.box32UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 32);
				} else if (vm.box32UseAt === 'N') {
					vm.box32UseAt = 'Y';
					vm.originalList.push(32);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox33UseAt = () => {
				if (vm.box33UseAt === 'Y') {
					vm.box33UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 33);
				} else if (vm.box33UseAt === 'N') {
					vm.box33UseAt = 'Y';
					vm.originalList.push(33);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox34UseAt = () => {
				if (vm.box34UseAt === 'Y') {
					vm.box34UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 34);
				} else if (vm.box34UseAt === 'N') {
					vm.box34UseAt = 'Y';
					vm.originalList.push(34);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox35UseAt = () => {
				if (vm.box35UseAt === 'Y') {
					vm.box35UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 35);
				} else if (vm.box35UseAt === 'N') {
					vm.box35UseAt = 'Y';
					vm.originalList.push(35);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox36UseAt = () => {
				if (vm.box36UseAt === 'Y') {
					vm.box36UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 36);
				} else if (vm.box36UseAt === 'N') {
					vm.box36UseAt = 'Y';
					vm.originalList.push(36);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox37UseAt = () => {
				if (vm.box37UseAt === 'Y') {
					vm.box37UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 37);
				} else if (vm.box37UseAt === 'N') {
					vm.box37UseAt = 'Y';
					vm.originalList.push(37);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox38UseAt = () => {
				if (vm.box38UseAt === 'Y') {
					vm.box38UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 38);
				} else if (vm.box38UseAt === 'N') {
					vm.box38UseAt = 'Y';
					vm.originalList.push(38);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox39UseAt = () => {
				if (vm.box39UseAt === 'Y') {
					vm.box39UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 39);
				} else if (vm.box39UseAt === 'N') {
					vm.box39UseAt = 'Y';
					vm.originalList.push(39);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox40UseAt = () => {
				if (vm.box40UseAt === 'Y') {
					vm.box40UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 40);
				} else if (vm.box40UseAt === 'N') {
					vm.box40UseAt = 'Y';
					vm.originalList.push(40);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox41UseAt = () => {
				if (vm.box41UseAt === 'Y') {
					vm.box41UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 41);
				} else if (vm.box41UseAt === 'N') {
					vm.box41UseAt = 'Y';
					vm.originalList.push(41);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox42UseAt = () => {
				if (vm.box42UseAt === 'Y') {
					vm.box42UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 42);
				} else if (vm.box42UseAt === 'N') {
					vm.box42UseAt = 'Y';
					vm.originalList.push(42);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox43UseAt = () => {
				if (vm.box43UseAt === 'Y') {
					vm.box43UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 43);
				} else if (vm.box43UseAt === 'N') {
					vm.box43UseAt = 'Y';
					vm.originalList.push(43);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox44UseAt = () => {
				if (vm.box44UseAt === 'Y') {
					vm.box44UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 44);
				} else if (vm.box44UseAt === 'N') {
					vm.box44UseAt = 'Y';
					vm.originalList.push(44);
					vm.sorting(vm.originalList);
				}
			};

			this.changeBox45UseAt = () => {
				if (vm.box45UseAt === 'Y') {
					vm.box45UseAt = 'N';
					vm.originalList = vm.originalList.filter(x => x !== 45);
				} else if (vm.box45UseAt === 'N') {
					vm.box45UseAt = 'Y';
					vm.originalList.push(45);
					vm.sorting(vm.originalList);
				}
			};

			//
			this.reset = () => {

				vm.originalList = [];
				for (let index = 1; index <= 45; index++) {
					vm.originalList.push(index);
				}

				vm.box1UseAt = 'Y';
				vm.box2UseAt = 'Y';
				vm.box3UseAt = 'Y';
				vm.box4UseAt = 'Y';
				vm.box5UseAt = 'Y';
				vm.box6UseAt = 'Y';
				vm.box7UseAt = 'Y';
				vm.box8UseAt = 'Y';
				vm.box9UseAt = 'Y';
				vm.box10UseAt = 'Y';
				vm.box11UseAt = 'Y';
				vm.box12UseAt = 'Y';
				vm.box13UseAt = 'Y';
				vm.box14UseAt = 'Y';
				vm.box15UseAt = 'Y';
				vm.box16UseAt = 'Y';
				vm.box17UseAt = 'Y';
				vm.box18UseAt = 'Y';
				vm.box19UseAt = 'Y';
				vm.box20UseAt = 'Y';
				vm.box21UseAt = 'Y';
				vm.box22UseAt = 'Y';
				vm.box23UseAt = 'Y';
				vm.box24UseAt = 'Y';
				vm.box25UseAt = 'Y';
				vm.box26UseAt = 'Y';
				vm.box27UseAt = 'Y';
				vm.box28UseAt = 'Y';
				vm.box29UseAt = 'Y';
				vm.box30UseAt = 'Y';
				vm.box31UseAt = 'Y';
				vm.box32UseAt = 'Y';
				vm.box33UseAt = 'Y';
				vm.box34UseAt = 'Y';
				vm.box35UseAt = 'Y';
				vm.box36UseAt = 'Y';
				vm.box37UseAt = 'Y';
				vm.box38UseAt = 'Y';
				vm.box39UseAt = 'Y';
				vm.box40UseAt = 'Y';
				vm.box41UseAt = 'Y';
				vm.box42UseAt = 'Y';
				vm.box43UseAt = 'Y';
				vm.box44UseAt = 'Y';
				vm.box45UseAt = 'Y';

			};

			//
			this.reverse = () => {

				vm.originalList = [];

				vm.box1UseAt = 'N';
				vm.box2UseAt = 'N';
				vm.box3UseAt = 'N';
				vm.box4UseAt = 'N';
				vm.box5UseAt = 'N';
				vm.box6UseAt = 'N';
				vm.box7UseAt = 'N';
				vm.box8UseAt = 'N';
				vm.box9UseAt = 'N';
				vm.box10UseAt = 'N';
				vm.box11UseAt = 'N';
				vm.box12UseAt = 'N';
				vm.box13UseAt = 'N';
				vm.box14UseAt = 'N';
				vm.box15UseAt = 'N';
				vm.box16UseAt = 'N';
				vm.box17UseAt = 'N';
				vm.box18UseAt = 'N';
				vm.box19UseAt = 'N';
				vm.box20UseAt = 'N';
				vm.box21UseAt = 'N';
				vm.box22UseAt = 'N';
				vm.box23UseAt = 'N';
				vm.box24UseAt = 'N';
				vm.box25UseAt = 'N';
				vm.box26UseAt = 'N';
				vm.box27UseAt = 'N';
				vm.box28UseAt = 'N';
				vm.box29UseAt = 'N';
				vm.box30UseAt = 'N';
				vm.box31UseAt = 'N';
				vm.box32UseAt = 'N';
				vm.box33UseAt = 'N';
				vm.box34UseAt = 'N';
				vm.box35UseAt = 'N';
				vm.box36UseAt = 'N';
				vm.box37UseAt = 'N';
				vm.box38UseAt = 'N';
				vm.box39UseAt = 'N';
				vm.box40UseAt = 'N';
				vm.box41UseAt = 'N';
				vm.box42UseAt = 'N';
				vm.box43UseAt = 'N';
				vm.box44UseAt = 'N';
				vm.box45UseAt = 'N';

			};

			//
			this.run = (list = []) => {

				__debug_info('LIST', list);
				const LEN = list.length;

				if (LEN < 6) {
					alert("최소 6개 앞면으로 설정해주세요.");
					return;
				} else if (24 < LEN) {
					alert("최대 24개까지 앞면으로 설정 가능합니다.");
					return;
				}

				let allCase = [];

				for (let i = 0; i < LEN; i++) {

					for (let j = 0; j < LEN; j++) {
						if (list[i] < list[j]) {

							for (let k = 0; k < LEN; k++) {
								if (list[j] < list[k]) {

									for (let l = 0; l < LEN; l++) {
										if (list[k] < list[l]) {

											for (let m = 0; m < LEN; m++) {
												if (list[l] < list[m]) {

													for (let n = 0; n < LEN; n++) {
														if (list[m] < list[n]) {

															let newList = [];
															newList.push(list[i]);
															newList.push(list[j]);
															newList.push(list[k]);
															newList.push(list[l]);
															newList.push(list[m]);
															newList.push(list[n]);

															allCase.push(newList);

														}
													}

												}
											}

										}
									}

								}
							}

						}
					}

				}

				__debug_info('k ', allCase);
				__debug_info('G ', allCase.length);

				if (allCase.length <= 0) {
					return;
				}

				function openModal() {
					return $modal.open({
						templateUrl: 'dialog.html',
						windowClass: 'modal-fullscreen',
						controller: 'SubController',
						controllerAs: 'self',
						backdrop: 'static',
						size: 'sm',
						resolve: {
							parameters: () => {
								return {
									data: allCase,
								};
							}
						}
					});
				}

				openModal().result.then(result => {

				}, cancel => {

				});
			};

			/*************************** START ***************************/
			vm.reset();

		}
	]);