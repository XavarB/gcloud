(function (React, adminjs, designSystem) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var Edit = function Edit(_ref) {
    var property = _ref.property,
      record = _ref.record,
      onChange = _ref.onChange;
    var params = record.params;
    var _ref2 = property,
      custom = _ref2.custom;
    var path = adminjs.flat.get(params, custom.filePathProperty);
    var key = adminjs.flat.get(params, custom.keyProperty);
    var file = adminjs.flat.get(params, custom.fileProperty);
    var _useState = React.useState(key),
      _useState2 = _slicedToArray(_useState, 2),
      originalKey = _useState2[0],
      setOriginalKey = _useState2[1];
    var _useState3 = React.useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      filesToUpload = _useState4[0],
      setFilesToUpload = _useState4[1];
    React.useEffect(function () {
      // it means means that someone hit save and new file has been uploaded
      // in this case fliesToUpload should be cleared.
      // This happens when user turns off redirect after new/edit
      if (typeof key === 'string' && key !== originalKey || typeof key !== 'string' && !originalKey || typeof key !== 'string' && Array.isArray(key) && key.length !== originalKey.length) {
        setOriginalKey(key);
        setFilesToUpload([]);
      }
    }, [key, originalKey]);
    var onUpload = function onUpload(files) {
      setFilesToUpload(files);
      onChange(custom.fileProperty, files);
    };
    var handleRemove = function handleRemove() {
      onChange(custom.fileProperty, null);
    };
    var handleMultiRemove = function handleMultiRemove(singleKey) {
      var index = (adminjs.flat.get(record.params, custom.keyProperty) || []).indexOf(singleKey);
      var filesToDelete = adminjs.flat.get(record.params, custom.filesToDeleteProperty) || [];
      if (path && path.length > 0) {
        var newPath = path.map(function (currentPath, i) {
          return i !== index ? currentPath : null;
        });
        var newParams = adminjs.flat.set(record.params, custom.filesToDeleteProperty, [].concat(_toConsumableArray(filesToDelete), [index]));
        newParams = adminjs.flat.set(newParams, custom.filePathProperty, newPath);
        onChange(_objectSpread2(_objectSpread2({}, record), {}, {
          params: newParams
        }));
      } else {
        // eslint-disable-next-line no-console
        console.log('You cannot remove file when there are no uploaded files yet');
      }
    };
    return /*#__PURE__*/React__default["default"].createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default["default"].createElement(designSystem.Label, null, property.label), /*#__PURE__*/React__default["default"].createElement(designSystem.DropZone, {
      onChange: onUpload,
      multiple: custom.multiple,
      validate: {
        mimeTypes: custom.mimeTypes,
        maxSize: custom.maxSize
      },
      files: filesToUpload
    }), !custom.multiple && key && path && !filesToUpload.length && file !== null && /*#__PURE__*/React__default["default"].createElement(designSystem.DropZoneItem, {
      filename: key,
      src: path,
      onRemove: handleRemove
    }), custom.multiple && key && key.length && path ? /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, key.map(function (singleKey, index) {
      // when we remove items we set only path index to nulls.
      // key is still there. This is because
      // we have to maintain all the indexes. So here we simply filter out elements which
      // were removed and display only what was left
      var currentPath = path[index];
      return currentPath ? /*#__PURE__*/React__default["default"].createElement(designSystem.DropZoneItem, {
        key: singleKey,
        filename: singleKey,
        src: path[index],
        onRemove: function onRemove() {
          return handleMultiRemove(singleKey);
        }
      }) : '';
    })) : '');
  };

  var AudioMimeTypes = ['audio/aac', 'audio/midi', 'audio/x-midi', 'audio/mpeg', 'audio/ogg', 'application/ogg', 'audio/opus', 'audio/wav', 'audio/webm', 'audio/3gpp2'];
  var ImageMimeTypes = ['image/bmp', 'image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/vnd.microsoft.icon', 'image/tiff', 'image/webp'];

  // eslint-disable-next-line import/no-extraneous-dependencies
  var SingleFile = function SingleFile(props) {
    var name = props.name,
      path = props.path,
      mimeType = props.mimeType,
      width = props.width;
    if (path && path.length) {
      if (mimeType && ImageMimeTypes.includes(mimeType)) {
        return /*#__PURE__*/React__default["default"].createElement("img", {
          src: path,
          style: {
            maxHeight: width,
            maxWidth: width
          },
          alt: name
        });
      }
      if (mimeType && AudioMimeTypes.includes(mimeType)) {
        return /*#__PURE__*/React__default["default"].createElement("audio", {
          controls: true,
          src: path
        }, "Your browser does not support the", /*#__PURE__*/React__default["default"].createElement("code", null, "audio"), /*#__PURE__*/React__default["default"].createElement("track", {
          kind: "captions"
        }));
      }
    }
    return /*#__PURE__*/React__default["default"].createElement(designSystem.Box, null, /*#__PURE__*/React__default["default"].createElement(designSystem.Button, {
      as: "a",
      href: path,
      ml: "default",
      size: "sm",
      rounded: true,
      target: "_blank"
    }, /*#__PURE__*/React__default["default"].createElement(designSystem.Icon, {
      icon: "DocumentDownload",
      color: "white",
      mr: "default"
    }), name));
  };
  var File = function File(_ref) {
    var width = _ref.width,
      record = _ref.record,
      property = _ref.property;
    var _ref2 = property,
      custom = _ref2.custom;
    var path = adminjs.flat.get(record === null || record === void 0 ? void 0 : record.params, custom.filePathProperty);
    if (!path) {
      return null;
    }
    var name = adminjs.flat.get(record === null || record === void 0 ? void 0 : record.params, custom.fileNameProperty ? custom.fileNameProperty : custom.keyProperty);
    var mimeType = custom.mimeTypeProperty && adminjs.flat.get(record === null || record === void 0 ? void 0 : record.params, custom.mimeTypeProperty);
    if (!property.custom.multiple) {
      if (custom.opts && custom.opts.baseUrl) {
        path = "".concat(custom.opts.baseUrl, "/").concat(name);
      }
      return /*#__PURE__*/React__default["default"].createElement(SingleFile, {
        path: path,
        name: name,
        width: width,
        mimeType: mimeType
      });
    }
    if (custom.opts && custom.opts.baseUrl) {
      var baseUrl = custom.opts.baseUrl || '';
      path = path.map(function (singlePath, index) {
        return "".concat(baseUrl, "/").concat(name[index]);
      });
    }
    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, path.map(function (singlePath, index) {
      return /*#__PURE__*/React__default["default"].createElement(SingleFile, {
        key: singlePath,
        path: singlePath,
        name: name[index],
        width: width,
        mimeType: mimeType[index]
      });
    }));
  };

  var List = function List(props) {
    return /*#__PURE__*/React__default["default"].createElement(File, _extends({
      width: 100
    }, props));
  };

  var Show = function Show(props) {
    var property = props.property;
    return /*#__PURE__*/React__default["default"].createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default["default"].createElement(designSystem.Label, null, property.label), /*#__PURE__*/React__default["default"].createElement(File, _extends({
      width: "100%"
    }, props)));
  };

  function Dashboard() {
    var _useCurrentAdmin = adminjs.useCurrentAdmin(),
      _useCurrentAdmin2 = _slicedToArray(_useCurrentAdmin, 1);
      _useCurrentAdmin2[0];
    var _useState = React.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];
    var _useState3 = React.useState([]),
      _useState4 = _slicedToArray(_useState3, 2);
      _useState4[0];
      var setUsers = _useState4[1];
    var _useState5 = React.useState([]),
      _useState6 = _slicedToArray(_useState5, 2);
      _useState6[0];
      var setClientsS1 = _useState6[1];
    var _useState7 = React.useState([]),
      _useState8 = _slicedToArray(_useState7, 2);
      _useState8[0];
      var setEmployees = _useState8[1];
    var _useState9 = React.useState([]),
      _useState10 = _slicedToArray(_useState9, 2);
      _useState10[0];
      var setExpense = _useState10[1];
    var _useState11 = React.useState([]),
      _useState12 = _slicedToArray(_useState11, 2);
      _useState12[0];
      var setIncome = _useState12[1];
    var api = new adminjs.ApiClient();
    React.useEffect(function () {
      api.getDashboard().then(function (response) {
        setData(response.data); // { message: 'Hello World' }
        setUsers(response.data.users);
        setClientsS1(response.data.clients);
        setEmployees(response.data.employees);
        setExpense(response.data.expense);
        setIncome(response.data.income);
        // console.log(data);
      })["catch"](function (error) {
        // handle any errors
      });
    }, []);
    var _useTranslation = adminjs.useTranslation();
      _useTranslation.translateMessage;
      _useTranslation.translateButton;

    //   const userMarkup = users.map((user)=>{
    //     // const clientS1Markup = clientsS1.map((clientS1)=>{
    //     return(
    //       <tr>
    //       <td>{user.email}</td>
    //       <td>{user.role}</td>
    //     </tr>
    //   )

    // })

    // const clientMarkup = clientsS1.map((client)=>{
    //   return(
    //     <tr>{client.name}</tr>
    //   )
    // })

    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, data !== null && /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("section", {
      className: "wow fadeIn animated",
      style: {
        visibility: 'visible',
        animationName: 'fadeIn'
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "row"
    }, /*#__PURE__*/React__default["default"].createElement("h1", {
      style: {
        fontSize: '100px',
        position: 'absolute',
        paddingTop: 80,
        fontFamily: 'serif'
      }
    }, "Farishta Enterprise"), /*#__PURE__*/React__default["default"].createElement("img", {
      src: "/bg4.jpeg",
      alt: "jjdh",
      style: {
        marginTop: 0,
        paddingTop: 0,
        position: 'relitive'
      }
    }), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "col-md-3 col-sm-6 bottom-margin text-center counter-section wow fadeInUp sm-margin-bottom-ten animated",
      "data-wow-duration": "300ms",
      style: {
        visibility: 'visible',
        animationDuration: '300ms',
        animationName: 'fadeInUp'
      }
    }, /*#__PURE__*/React__default["default"].createElement("img", {
      src: "/users.png",
      alt: "users"
    }), /*#__PURE__*/React__default["default"].createElement("span", {
      id: "anim-number-pizza",
      className: "counter-number"
    }), /*#__PURE__*/React__default["default"].createElement("span", {
      className: "timer counter alt-font appear",
      "data-to": 980,
      "data-speed": 7000
    }, data.users.length), /*#__PURE__*/React__default["default"].createElement("p", {
      className: "counter-title"
    }, "Total active Users")), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "col-md-3 col-sm-6 bottom-margin text-center counter-section wow fadeInUp sm-margin-bottom-ten animated",
      "data-wow-duration": "600ms",
      style: {
        visibility: 'visible',
        animationDuration: '600ms',
        animationName: 'fadeInUp'
      }
    }, /*#__PURE__*/React__default["default"].createElement("img", {
      src: "/clients.png",
      alt: "clients"
    }), /*#__PURE__*/React__default["default"].createElement("span", {
      className: "timer counter alt-font appear",
      "data-to": 980,
      "data-speed": 7000
    }, data.clients.length), /*#__PURE__*/React__default["default"].createElement("span", {
      className: "counter-title"
    }, "Total Clients")), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "col-md-3 col-sm-6 bottom-margin-small text-center counter-section wow fadeInUp xs-margin-bottom-ten animated",
      "data-wow-duration": "900ms",
      style: {
        visibility: 'visible',
        animationDuration: '900ms',
        animationName: 'fadeInUp'
      }
    }, /*#__PURE__*/React__default["default"].createElement("img", {
      src: "/employee.png",
      alt: "employee"
    }), /*#__PURE__*/React__default["default"].createElement("span", {
      className: "timer counter alt-font appear",
      "data-to": 810,
      "data-speed": 7000
    }, data.employees.length), /*#__PURE__*/React__default["default"].createElement("span", {
      className: "counter-title"
    }, "Number of working Employees")), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "col-md-3 col-sm-6 text-center counter-section wow fadeInUp animated",
      "data-wow-duration": "1200ms",
      style: {
        visibility: 'visible',
        animationDuration: '1200ms',
        animationName: 'fadeInUp'
      }
    }, /*#__PURE__*/React__default["default"].createElement("img", {
      src: "/expences.png",
      alt: "expences"
    }), /*#__PURE__*/React__default["default"].createElement("span", {
      className: "timer counter alt-font appear",
      "data-to": 600,
      "data-speed": 7000
    }, data.expense.length), /*#__PURE__*/React__default["default"].createElement("span", {
      className: "counter-title"
    }, "Clients expense entries")))))));
  }

  // <h1 style={{backgroundColor:'#fffff'}}>{(data.message)}</h1>
  // <h1 style={{backgroundColor:'#fffff'}}>{(data.users.length)}</h1>
  // <table className='container bg-primary'>
  //   <tbody>
  //     {userMarkup}

  //   </tbody>
  // </table>

  function ExpenseTotal(props) {
    var record = props.record;
      props.property;
    var params = record.params;
    var sum = params.Medical_expenses + params.Pakistan_Office_exp + params.Pakistan_Sal + params.Pakistan_Gov_fee + params.Pakistan_Comission + params.Others_Pakistan_exp + params.Malaysia_Office_exp + params.Malaysia_sal + params.Malaysia_Gov_fee + params.Malaysia_Comission + params.Others_Malaysia_exp;
    console.log('Working');
    console.log(params);
    return /*#__PURE__*/React__default["default"].createElement("section", {
      className: "box__Box-sc-17sbq3p-0 buPzZx adminjs_Box"
    }, /*#__PURE__*/React__default["default"].createElement("label", {
      className: "label__Label-sc-o90s7d-0 jqkxb adminjs_Label"
    }, "Expense Total"), sum);
  }

  function IncomeTotal(props) {
    var record = props.record;
      props.property;
    var params = record.params;
    var sum = params.Client_income + params.Agent_or_Agency_income + params.Employer_income + params.other_Incomes;
    console.log(params);
    return /*#__PURE__*/React__default["default"].createElement("section", {
      className: "box__Box-sc-17sbq3p-0 buPzZx adminjs_Box"
    }, /*#__PURE__*/React__default["default"].createElement("label", {
      className: "label__Label-sc-o90s7d-0 jqkxb adminjs_Label"
    }, "Total Income"), sum);
  }

  function ClientIncomeTotal(props) {
    var record = props.record;
      props.property;
    console.log(record);
    record.params;
    var income = record.populated.income.params;
    console.log(income);
    var url = window.location.href;
    var lastPart = url.split("/").pop();
    console.log(lastPart);
    var clientsincometotal = income.Client_income + income.Agent_or_Agency_income + income.Employer_income + income.other_Incomes;
    if (lastPart === 'show') {
      return /*#__PURE__*/React__default["default"].createElement("section", {
        className: "box__Box-sc-17sbq3p-0 buPzZx adminjs_Box"
      }, /*#__PURE__*/React__default["default"].createElement("label", {
        className: "label__Label-sc-o90s7d-0 jqkxb adminjs_Label"
      }, "Client Income Total"), clientsincometotal);
    } else return /*#__PURE__*/React__default["default"].createElement("div", null, clientsincometotal);
  }

  function ClientExpenseTotal(props) {
    var record = props.record;
      props.property;
    console.log(record);
    record.params;
    var expense = record.populated.expense.params;
    console.log(expense);
    var url = window.location.href;
    var lastPart = url.split("/").pop();
    console.log(lastPart);
    var clientsexpensetotal = expense.Medical_expenses + expense.Pakistan_Office_exp + expense.Pakistan_Sal + expense.Pakistan_Gov_fee + expense.Pakistan_Comission + expense.Others_Pakistan_exp + expense.Malaysia_Office_exp + expense.Malaysia_sal + expense.Malaysia_Gov_fee + expense.Malaysia_Comission + expense.Others_Malaysia_exp;
    console.log(clientsexpensetotal);
    if (lastPart === 'show') {
      return /*#__PURE__*/React__default["default"].createElement("section", {
        className: "box__Box-sc-17sbq3p-0 buPzZx adminjs_Box"
      }, /*#__PURE__*/React__default["default"].createElement("label", {
        className: "label__Label-sc-o90s7d-0 jqkxb adminjs_Label"
      }, " Total Expense"), clientsexpensetotal);
    } else return /*#__PURE__*/React__default["default"].createElement("div", null, clientsexpensetotal);
  }

  var GeneratePdf = function GeneratePdf(props) {
    var _useCurrentAdmin = adminjs.useCurrentAdmin(),
      _useCurrentAdmin2 = _slicedToArray(_useCurrentAdmin, 1);
      _useCurrentAdmin2[0];
    var record = props.record,
      resource = props.resource;
    var api = new adminjs.ApiClient();
    React.useEffect(function () {
      api.recordAction({
        recordId: record.id,
        resourceId: resource.id,
        actionName: 'PdfGen'
      }).then(function (response) {
        console.log(response.data.url);
        window.location.href = response.data.url;
      })["catch"](function (err) {
        console.error(err);
      });
    }, []);
    return /*#__PURE__*/React__default["default"].createElement(designSystem.Loader, null);
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.Component0 = Edit;
  AdminJS.UserComponents.Component1 = List;
  AdminJS.UserComponents.Component2 = Show;
  AdminJS.UserComponents.Component3 = Edit;
  AdminJS.UserComponents.Component4 = List;
  AdminJS.UserComponents.Component5 = Show;
  AdminJS.UserComponents.Dashboard = Dashboard;
  AdminJS.UserComponents.ExpenseTotal = ExpenseTotal;
  AdminJS.UserComponents.IncomeTotal = IncomeTotal;
  AdminJS.UserComponents.ClientIncomeTotal = ClientIncomeTotal;
  AdminJS.UserComponents.ClientExpenseTotal = ClientExpenseTotal;
  AdminJS.UserComponents.Pdf = GeneratePdf;

})(React, AdminJS, AdminJSDesignSystem);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL2VkaXQudHN4IiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvdHlwZXMvbWltZS10eXBlcy50eXBlLnRzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9maWxlLnRzeCIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvbGlzdC50c3giLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL3Nob3cudHN4IiwiLi4vZGFzaGJvYXJkLmpzeCIsIi4uL2NvbXBvbmVudC9FeHBlbnNlVG90YWwuanN4IiwiLi4vY29tcG9uZW50L0luY29tZVRvdGFsLmpzeCIsIi4uL2NvbXBvbmVudC9DbGllbnRJbmNvbWVUb3RhbC5qc3giLCIuLi9jb21wb25lbnQvQ2xpZW50VG90YWxFeHBlbnNlLmpzeCIsIi4uL2NvbXBvbmVudC9QREZHZW5lcmF0b3IuanN4IiwiLmVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBGQywgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRWRpdFByb3BlcnR5UHJvcHMsIGZsYXQgfSBmcm9tICdhZG1pbmpzJ1xuaW1wb3J0IHsgRHJvcFpvbmUsIEZvcm1Hcm91cCwgTGFiZWwsIERyb3Bab25lSXRlbSB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nXG5pbXBvcnQgUHJvcGVydHlDdXN0b20gZnJvbSAnLi4vdHlwZXMvcHJvcGVydHktY3VzdG9tLnR5cGUnXG5cbmNvbnN0IEVkaXQ6IEZDPEVkaXRQcm9wZXJ0eVByb3BzPiA9ICh7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlIH0pID0+IHtcbiAgY29uc3QgeyBwYXJhbXMgfSA9IHJlY29yZFxuICBjb25zdCB7IGN1c3RvbSB9ID0gcHJvcGVydHkgYXMgdW5rbm93biBhcyB7IGN1c3RvbTogUHJvcGVydHlDdXN0b20gfVxuXG4gIGNvbnN0IHBhdGggPSBmbGF0LmdldChwYXJhbXMsIGN1c3RvbS5maWxlUGF0aFByb3BlcnR5KVxuICBjb25zdCBrZXkgPSBmbGF0LmdldChwYXJhbXMsIGN1c3RvbS5rZXlQcm9wZXJ0eSlcbiAgY29uc3QgZmlsZSA9IGZsYXQuZ2V0KHBhcmFtcywgY3VzdG9tLmZpbGVQcm9wZXJ0eSlcblxuICBjb25zdCBbb3JpZ2luYWxLZXksIHNldE9yaWdpbmFsS2V5XSA9IHVzZVN0YXRlKGtleSlcbiAgY29uc3QgW2ZpbGVzVG9VcGxvYWQsIHNldEZpbGVzVG9VcGxvYWRdID0gdXNlU3RhdGU8QXJyYXk8RmlsZT4+KFtdKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gaXQgbWVhbnMgbWVhbnMgdGhhdCBzb21lb25lIGhpdCBzYXZlIGFuZCBuZXcgZmlsZSBoYXMgYmVlbiB1cGxvYWRlZFxuICAgIC8vIGluIHRoaXMgY2FzZSBmbGllc1RvVXBsb2FkIHNob3VsZCBiZSBjbGVhcmVkLlxuICAgIC8vIFRoaXMgaGFwcGVucyB3aGVuIHVzZXIgdHVybnMgb2ZmIHJlZGlyZWN0IGFmdGVyIG5ldy9lZGl0XG4gICAgaWYgKFxuICAgICAgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnICYmIGtleSAhPT0gb3JpZ2luYWxLZXkpXG4gICAgICB8fCAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgJiYgIW9yaWdpbmFsS2V5KVxuICAgICAgfHwgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnICYmIEFycmF5LmlzQXJyYXkoa2V5KSAmJiBrZXkubGVuZ3RoICE9PSBvcmlnaW5hbEtleS5sZW5ndGgpXG4gICAgKSB7XG4gICAgICBzZXRPcmlnaW5hbEtleShrZXkpXG4gICAgICBzZXRGaWxlc1RvVXBsb2FkKFtdKVxuICAgIH1cbiAgfSwgW2tleSwgb3JpZ2luYWxLZXldKVxuXG4gIGNvbnN0IG9uVXBsb2FkID0gKGZpbGVzOiBBcnJheTxGaWxlPik6IHZvaWQgPT4ge1xuICAgIHNldEZpbGVzVG9VcGxvYWQoZmlsZXMpXG4gICAgb25DaGFuZ2UoY3VzdG9tLmZpbGVQcm9wZXJ0eSwgZmlsZXMpXG4gIH1cblxuICBjb25zdCBoYW5kbGVSZW1vdmUgPSAoKSA9PiB7XG4gICAgb25DaGFuZ2UoY3VzdG9tLmZpbGVQcm9wZXJ0eSwgbnVsbClcbiAgfVxuXG4gIGNvbnN0IGhhbmRsZU11bHRpUmVtb3ZlID0gKHNpbmdsZUtleSkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gKGZsYXQuZ2V0KHJlY29yZC5wYXJhbXMsIGN1c3RvbS5rZXlQcm9wZXJ0eSkgfHwgW10pLmluZGV4T2Yoc2luZ2xlS2V5KVxuICAgIGNvbnN0IGZpbGVzVG9EZWxldGUgPSBmbGF0LmdldChyZWNvcmQucGFyYW1zLCBjdXN0b20uZmlsZXNUb0RlbGV0ZVByb3BlcnR5KSB8fCBbXVxuICAgIGlmIChcbiAgICAgIHBhdGggJiYgcGF0aC5sZW5ndGggPiAwXG4gICAgKSB7XG4gICAgICBjb25zdCBuZXdQYXRoID0gcGF0aC5tYXAoKGN1cnJlbnRQYXRoLCBpKSA9PiAoaSAhPT0gaW5kZXggPyBjdXJyZW50UGF0aCA6IG51bGwpKVxuICAgICAgbGV0IG5ld1BhcmFtcyA9IGZsYXQuc2V0KFxuICAgICAgICByZWNvcmQucGFyYW1zLFxuICAgICAgICBjdXN0b20uZmlsZXNUb0RlbGV0ZVByb3BlcnR5LFxuICAgICAgICBbLi4uZmlsZXNUb0RlbGV0ZSwgaW5kZXhdLFxuICAgICAgKVxuICAgICAgbmV3UGFyYW1zID0gZmxhdC5zZXQobmV3UGFyYW1zLCBjdXN0b20uZmlsZVBhdGhQcm9wZXJ0eSwgbmV3UGF0aClcblxuICAgICAgb25DaGFuZ2Uoe1xuICAgICAgICAuLi5yZWNvcmQsXG4gICAgICAgIHBhcmFtczogbmV3UGFyYW1zLFxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUubG9nKCdZb3UgY2Fubm90IHJlbW92ZSBmaWxlIHdoZW4gdGhlcmUgYXJlIG5vIHVwbG9hZGVkIGZpbGVzIHlldCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8Rm9ybUdyb3VwPlxuICAgICAgPExhYmVsPntwcm9wZXJ0eS5sYWJlbH08L0xhYmVsPlxuICAgICAgPERyb3Bab25lXG4gICAgICAgIG9uQ2hhbmdlPXtvblVwbG9hZH1cbiAgICAgICAgbXVsdGlwbGU9e2N1c3RvbS5tdWx0aXBsZX1cbiAgICAgICAgdmFsaWRhdGU9e3tcbiAgICAgICAgICBtaW1lVHlwZXM6IGN1c3RvbS5taW1lVHlwZXMgYXMgQXJyYXk8c3RyaW5nPixcbiAgICAgICAgICBtYXhTaXplOiBjdXN0b20ubWF4U2l6ZSxcbiAgICAgICAgfX1cbiAgICAgICAgZmlsZXM9e2ZpbGVzVG9VcGxvYWR9XG4gICAgICAvPlxuICAgICAgeyFjdXN0b20ubXVsdGlwbGUgJiYga2V5ICYmIHBhdGggJiYgIWZpbGVzVG9VcGxvYWQubGVuZ3RoICYmIGZpbGUgIT09IG51bGwgJiYgKFxuICAgICAgICA8RHJvcFpvbmVJdGVtIGZpbGVuYW1lPXtrZXl9IHNyYz17cGF0aH0gb25SZW1vdmU9e2hhbmRsZVJlbW92ZX0gLz5cbiAgICAgICl9XG4gICAgICB7Y3VzdG9tLm11bHRpcGxlICYmIGtleSAmJiBrZXkubGVuZ3RoICYmIHBhdGggPyAoXG4gICAgICAgIDw+XG4gICAgICAgICAge2tleS5tYXAoKHNpbmdsZUtleSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIC8vIHdoZW4gd2UgcmVtb3ZlIGl0ZW1zIHdlIHNldCBvbmx5IHBhdGggaW5kZXggdG8gbnVsbHMuXG4gICAgICAgICAgICAvLyBrZXkgaXMgc3RpbGwgdGhlcmUuIFRoaXMgaXMgYmVjYXVzZVxuICAgICAgICAgICAgLy8gd2UgaGF2ZSB0byBtYWludGFpbiBhbGwgdGhlIGluZGV4ZXMuIFNvIGhlcmUgd2Ugc2ltcGx5IGZpbHRlciBvdXQgZWxlbWVudHMgd2hpY2hcbiAgICAgICAgICAgIC8vIHdlcmUgcmVtb3ZlZCBhbmQgZGlzcGxheSBvbmx5IHdoYXQgd2FzIGxlZnRcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQYXRoID0gcGF0aFtpbmRleF1cbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UGF0aCA/IChcbiAgICAgICAgICAgICAgPERyb3Bab25lSXRlbVxuICAgICAgICAgICAgICAgIGtleT17c2luZ2xlS2V5fVxuICAgICAgICAgICAgICAgIGZpbGVuYW1lPXtzaW5nbGVLZXl9XG4gICAgICAgICAgICAgICAgc3JjPXtwYXRoW2luZGV4XX1cbiAgICAgICAgICAgICAgICBvblJlbW92ZT17KCkgPT4gaGFuZGxlTXVsdGlSZW1vdmUoc2luZ2xlS2V5KX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiAnJ1xuICAgICAgICAgIH0pfVxuICAgICAgICA8Lz5cbiAgICAgICkgOiAnJ31cbiAgICA8L0Zvcm1Hcm91cD5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBFZGl0XG4iLCJleHBvcnQgY29uc3QgQXVkaW9NaW1lVHlwZXMgPSBbXG4gICdhdWRpby9hYWMnLFxuICAnYXVkaW8vbWlkaScsXG4gICdhdWRpby94LW1pZGknLFxuICAnYXVkaW8vbXBlZycsXG4gICdhdWRpby9vZ2cnLFxuICAnYXBwbGljYXRpb24vb2dnJyxcbiAgJ2F1ZGlvL29wdXMnLFxuICAnYXVkaW8vd2F2JyxcbiAgJ2F1ZGlvL3dlYm0nLFxuICAnYXVkaW8vM2dwcDInLFxuXSBhcyBjb25zdFxuXG5leHBvcnQgY29uc3QgVmlkZW9NaW1lVHlwZXMgPSBbXG4gICd2aWRlby94LW1zdmlkZW8nLFxuICAndmlkZW8vbXBlZycsXG4gICd2aWRlby9vZ2cnLFxuICAndmlkZW8vbXAydCcsXG4gICd2aWRlby93ZWJtJyxcbiAgJ3ZpZGVvLzNncHAnLFxuICAndmlkZW8vM2dwcDInLFxuXSBhcyBjb25zdFxuXG5leHBvcnQgY29uc3QgSW1hZ2VNaW1lVHlwZXMgPSBbXG4gICdpbWFnZS9ibXAnLFxuICAnaW1hZ2UvZ2lmJyxcbiAgJ2ltYWdlL2pwZWcnLFxuICAnaW1hZ2UvcG5nJyxcbiAgJ2ltYWdlL3N2Zyt4bWwnLFxuICAnaW1hZ2Uvdm5kLm1pY3Jvc29mdC5pY29uJyxcbiAgJ2ltYWdlL3RpZmYnLFxuICAnaW1hZ2Uvd2VicCcsXG5dIGFzIGNvbnN0XG5cbmV4cG9ydCBjb25zdCBDb21wcmVzc2VkTWltZVR5cGVzID0gW1xuICAnYXBwbGljYXRpb24veC1iemlwJyxcbiAgJ2FwcGxpY2F0aW9uL3gtYnppcDInLFxuICAnYXBwbGljYXRpb24vZ3ppcCcsXG4gICdhcHBsaWNhdGlvbi9qYXZhLWFyY2hpdmUnLFxuICAnYXBwbGljYXRpb24veC10YXInLFxuICAnYXBwbGljYXRpb24vemlwJyxcbiAgJ2FwcGxpY2F0aW9uL3gtN3otY29tcHJlc3NlZCcsXG5dIGFzIGNvbnN0XG5cbmV4cG9ydCBjb25zdCBEb2N1bWVudE1pbWVUeXBlcyA9IFtcbiAgJ2FwcGxpY2F0aW9uL3gtYWJpd29yZCcsXG4gICdhcHBsaWNhdGlvbi94LWZyZWVhcmMnLFxuICAnYXBwbGljYXRpb24vdm5kLmFtYXpvbi5lYm9vaycsXG4gICdhcHBsaWNhdGlvbi9tc3dvcmQnLFxuICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LndvcmRwcm9jZXNzaW5nbWwuZG9jdW1lbnQnLFxuICAnYXBwbGljYXRpb24vdm5kLm1zLWZvbnRvYmplY3QnLFxuICAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5wcmVzZW50YXRpb24nLFxuICAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5zcHJlYWRzaGVldCcsXG4gICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnRleHQnLFxuICAnYXBwbGljYXRpb24vdm5kLm1zLXBvd2VycG9pbnQnLFxuICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnByZXNlbnRhdGlvbm1sLnByZXNlbnRhdGlvbicsXG4gICdhcHBsaWNhdGlvbi92bmQucmFyJyxcbiAgJ2FwcGxpY2F0aW9uL3J0ZicsXG4gICdhcHBsaWNhdGlvbi92bmQubXMtZXhjZWwnLFxuICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwuc2hlZXQnLFxuXSBhcyBjb25zdFxuXG5leHBvcnQgY29uc3QgVGV4dE1pbWVUeXBlcyA9IFtcbiAgJ3RleHQvY3NzJyxcbiAgJ3RleHQvY3N2JyxcbiAgJ3RleHQvaHRtbCcsXG4gICd0ZXh0L2NhbGVuZGFyJyxcbiAgJ3RleHQvamF2YXNjcmlwdCcsXG4gICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgJ2FwcGxpY2F0aW9uL2xkK2pzb24nLFxuICAndGV4dC9qYXZhc2NyaXB0JyxcbiAgJ3RleHQvcGxhaW4nLFxuICAnYXBwbGljYXRpb24veGh0bWwreG1sJyxcbiAgJ2FwcGxpY2F0aW9uL3htbCcsXG4gICd0ZXh0L3htbCcsXG5dIGFzIGNvbnN0XG5cbmV4cG9ydCBjb25zdCBCaW5hcnlEb2NzTWltZVR5cGVzID0gW1xuICAnYXBwbGljYXRpb24vZXB1Yit6aXAnLFxuICAnYXBwbGljYXRpb24vcGRmJyxcbl0gYXMgY29uc3RcblxuZXhwb3J0IGNvbnN0IEZvbnRNaW1lVHlwZXMgPSBbXG4gICdmb250L290ZicsXG4gICdmb250L3R0ZicsXG4gICdmb250L3dvZmYnLFxuICAnZm9udC93b2ZmMicsXG5dIGFzIGNvbnN0XG5cbmV4cG9ydCBjb25zdCBPdGhlck1pbWVUeXBlcyA9IFtcbiAgJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScsXG4gICdhcHBsaWNhdGlvbi94LWNzaCcsXG4gICdhcHBsaWNhdGlvbi92bmQuYXBwbGUuaW5zdGFsbGVyK3htbCcsXG4gICdhcHBsaWNhdGlvbi94LWh0dHBkLXBocCcsXG4gICdhcHBsaWNhdGlvbi94LXNoJyxcbiAgJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJyxcbiAgJ3ZuZC52aXNpbycsXG4gICdhcHBsaWNhdGlvbi92bmQubW96aWxsYS54dWwreG1sJyxcbl0gYXMgY29uc3RcblxuZXhwb3J0IGNvbnN0IE1pbWVUeXBlcyA9IFtcbiAgLi4uQXVkaW9NaW1lVHlwZXMsXG4gIC4uLlZpZGVvTWltZVR5cGVzLFxuICAuLi5JbWFnZU1pbWVUeXBlcyxcbiAgLi4uQ29tcHJlc3NlZE1pbWVUeXBlcyxcbiAgLi4uRG9jdW1lbnRNaW1lVHlwZXMsXG4gIC4uLlRleHRNaW1lVHlwZXMsXG4gIC4uLkJpbmFyeURvY3NNaW1lVHlwZXMsXG4gIC4uLk90aGVyTWltZVR5cGVzLFxuICAuLi5Gb250TWltZVR5cGVzLFxuICAuLi5PdGhlck1pbWVUeXBlcyxcbl1cblxudHlwZSBQb3B1bGFyTWltZVR5cGVzID0gdHlwZW9mIE1pbWVUeXBlc1tudW1iZXJdXG5cbmV4cG9ydCB0eXBlIE1pbWVUeXBlID0gUG9wdWxhck1pbWVUeXBlcyB8IHtcbiAgW2tleTogc3RyaW5nXTogc3RyaW5nXG59XG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLWV4dHJhbmVvdXMtZGVwZW5kZW5jaWVzXG5pbXBvcnQgeyBCb3gsIEJ1dHRvbiwgSWNvbiB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nXG5pbXBvcnQgeyBmbGF0LCBTaG93UHJvcGVydHlQcm9wcyB9IGZyb20gJ2FkbWluanMnXG5pbXBvcnQgUmVhY3QsIHsgRkMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEF1ZGlvTWltZVR5cGVzLCBJbWFnZU1pbWVUeXBlcyB9IGZyb20gJy4uL3R5cGVzL21pbWUtdHlwZXMudHlwZSdcbmltcG9ydCBQcm9wZXJ0eUN1c3RvbSBmcm9tICcuLi90eXBlcy9wcm9wZXJ0eS1jdXN0b20udHlwZSdcblxudHlwZSBQcm9wcyA9IFNob3dQcm9wZXJ0eVByb3BzICYge1xuICB3aWR0aD86IG51bWJlciB8IHN0cmluZztcbn07XG5cbnR5cGUgU2luZ2xlRmlsZVByb3BzID0ge1xuICBuYW1lOiBzdHJpbmc7XG4gIHBhdGg/OiBzdHJpbmc7XG4gIG1pbWVUeXBlPzogc3RyaW5nO1xuICB3aWR0aD86IG51bWJlciB8IHN0cmluZztcbn07XG5cbmNvbnN0IFNpbmdsZUZpbGU6IEZDPFNpbmdsZUZpbGVQcm9wcz4gPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyBuYW1lLCBwYXRoLCBtaW1lVHlwZSwgd2lkdGggfSA9IHByb3BzXG5cbiAgaWYgKHBhdGggJiYgcGF0aC5sZW5ndGgpIHtcbiAgICBpZiAobWltZVR5cGUgJiYgSW1hZ2VNaW1lVHlwZXMuaW5jbHVkZXMobWltZVR5cGUgYXMgYW55KSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGltZ1xuICAgICAgICAgIHNyYz17cGF0aH1cbiAgICAgICAgICBzdHlsZT17eyBtYXhIZWlnaHQ6IHdpZHRoLCBtYXhXaWR0aDogd2lkdGggfX1cbiAgICAgICAgICBhbHQ9e25hbWV9XG4gICAgICAgIC8+XG4gICAgICApXG4gICAgfVxuICAgIGlmIChtaW1lVHlwZSAmJiBBdWRpb01pbWVUeXBlcy5pbmNsdWRlcyhtaW1lVHlwZSBhcyBhbnkpKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8YXVkaW8gY29udHJvbHMgc3JjPXtwYXRofT5cbiAgICAgICAgICBZb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGVcbiAgICAgICAgICA8Y29kZT5hdWRpbzwvY29kZT5cbiAgICAgICAgICA8dHJhY2sga2luZD1cImNhcHRpb25zXCIgLz5cbiAgICAgICAgPC9hdWRpbz5cbiAgICAgIClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIChcbiAgICA8Qm94PlxuICAgICAgPEJ1dHRvbiBhcz1cImFcIiBocmVmPXtwYXRofSBtbD1cImRlZmF1bHRcIiBzaXplPVwic21cIiByb3VuZGVkIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgICA8SWNvbiBpY29uPVwiRG9jdW1lbnREb3dubG9hZFwiIGNvbG9yPVwid2hpdGVcIiBtcj1cImRlZmF1bHRcIiAvPlxuICAgICAgICB7bmFtZX1cbiAgICAgIDwvQnV0dG9uPlxuICAgIDwvQm94PlxuICApXG59XG5cbmNvbnN0IEZpbGU6IEZDPFByb3BzPiA9ICh7IHdpZHRoLCByZWNvcmQsIHByb3BlcnR5IH0pID0+IHtcbiAgY29uc3QgeyBjdXN0b20gfSA9IHByb3BlcnR5IGFzIHVua25vd24gYXMgeyBjdXN0b206IFByb3BlcnR5Q3VzdG9tIH1cblxuICBsZXQgcGF0aCA9IGZsYXQuZ2V0KHJlY29yZD8ucGFyYW1zLCBjdXN0b20uZmlsZVBhdGhQcm9wZXJ0eSlcblxuICBpZiAoIXBhdGgpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgY29uc3QgbmFtZSA9IGZsYXQuZ2V0KFxuICAgIHJlY29yZD8ucGFyYW1zLFxuICAgIGN1c3RvbS5maWxlTmFtZVByb3BlcnR5ID8gY3VzdG9tLmZpbGVOYW1lUHJvcGVydHkgOiBjdXN0b20ua2V5UHJvcGVydHksXG4gIClcblxuICBjb25zdCBtaW1lVHlwZSA9IGN1c3RvbS5taW1lVHlwZVByb3BlcnR5XG4gICAgJiYgZmxhdC5nZXQocmVjb3JkPy5wYXJhbXMsIGN1c3RvbS5taW1lVHlwZVByb3BlcnR5KVxuXG4gIGlmICghcHJvcGVydHkuY3VzdG9tLm11bHRpcGxlKSB7XG4gICAgaWYgKGN1c3RvbS5vcHRzICYmIGN1c3RvbS5vcHRzLmJhc2VVcmwpIHtcbiAgICAgIHBhdGggPSBgJHtjdXN0b20ub3B0cy5iYXNlVXJsfS8ke25hbWV9YFxuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPFNpbmdsZUZpbGUgcGF0aD17cGF0aH0gbmFtZT17bmFtZX0gd2lkdGg9e3dpZHRofSBtaW1lVHlwZT17bWltZVR5cGV9IC8+XG4gICAgKVxuICB9XG4gIGlmIChjdXN0b20ub3B0cyAmJiBjdXN0b20ub3B0cy5iYXNlVXJsKSB7XG4gICAgY29uc3QgYmFzZVVybCA9IGN1c3RvbS5vcHRzLmJhc2VVcmwgfHwgJydcbiAgICBwYXRoID0gcGF0aC5tYXAoKHNpbmdsZVBhdGgsIGluZGV4KSA9PiBgJHtiYXNlVXJsfS8ke25hbWVbaW5kZXhdfWApXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7cGF0aC5tYXAoKHNpbmdsZVBhdGgsIGluZGV4KSA9PiAoXG4gICAgICAgIDxTaW5nbGVGaWxlXG4gICAgICAgICAga2V5PXtzaW5nbGVQYXRofVxuICAgICAgICAgIHBhdGg9e3NpbmdsZVBhdGh9XG4gICAgICAgICAgbmFtZT17bmFtZVtpbmRleF19XG4gICAgICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgICAgIG1pbWVUeXBlPXttaW1lVHlwZVtpbmRleF19XG4gICAgICAgIC8+XG4gICAgICApKX1cbiAgICA8Lz5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBGaWxlXG4iLCJpbXBvcnQgUmVhY3QsIHsgRkMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFNob3dQcm9wZXJ0eVByb3BzIH0gZnJvbSAnYWRtaW5qcydcblxuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlJ1xuXG5jb25zdCBMaXN0OiBGQzxTaG93UHJvcGVydHlQcm9wcz4gPSAocHJvcHMpID0+ICg8RmlsZSB3aWR0aD17MTAwfSB7Li4ucHJvcHN9IC8+KVxuXG5leHBvcnQgZGVmYXVsdCBMaXN0XG4iLCJpbXBvcnQgUmVhY3QsIHsgRkMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFNob3dQcm9wZXJ0eVByb3BzIH0gZnJvbSAnYWRtaW5qcydcbmltcG9ydCB7IEZvcm1Hcm91cCwgTGFiZWwgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJ1xuXG5pbXBvcnQgRmlsZSBmcm9tICcuL2ZpbGUnXG5cbmNvbnN0IFNob3c6IEZDPFNob3dQcm9wZXJ0eVByb3BzPiA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHByb3BlcnR5IH0gPSBwcm9wc1xuXG4gIHJldHVybiAoXG4gICAgPEZvcm1Hcm91cD5cbiAgICAgIDxMYWJlbD57cHJvcGVydHkubGFiZWx9PC9MYWJlbD5cbiAgICAgIDxGaWxlIHdpZHRoPVwiMTAwJVwiIHsuLi5wcm9wc30gLz5cbiAgICA8L0Zvcm1Hcm91cD5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaG93XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgQXBpQ2xpZW50LHVzZUN1cnJlbnRBZG1pbiB9IGZyb20gJ2FkbWluanMnXG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJ1xuaW1wb3J0IHtcbiAgQm94LFxuICBIMixcbiAgSDUsXG4gIEg0LFxuICBUZXh0LFxuICBJbGx1c3RyYXRpb24sXG4gIElsbHVzdHJhdGlvblByb3BzLFxuICBCdXR0b24sXG59IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nXG5pbXBvcnQgeyB1c2VUcmFuc2xhdGlvbiB9IGZyb20gJ2FkbWluanMnXG5cblxuXG5leHBvcnQgIGZ1bmN0aW9uIERhc2hib2FyZCgpICB7XG4gIGNvbnN0IFtjdXJyZW50QWRtaW5dID0gdXNlQ3VycmVudEFkbWluKCk7XG4gIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlKG51bGwpXG4gIGNvbnN0IFt1c2VycyxzZXRVc2Vyc10gPSB1c2VTdGF0ZShbXSlcbiAgY29uc3QgW2NsaWVudHNTMSxzZXRDbGllbnRzUzFdID0gdXNlU3RhdGUoW10pXG4gIGNvbnN0IFtlbXBsb3llZXMsc2V0RW1wbG95ZWVzXSA9IHVzZVN0YXRlKFtdKVxuICBjb25zdCBbZXhwZW5zZSxzZXRFeHBlbnNlXSA9IHVzZVN0YXRlKFtdKVxuICBjb25zdCBbaW5jb21lLHNldEluY29tZV0gPSB1c2VTdGF0ZShbXSlcbiAgY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpXG4gIFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGFwaS5nZXREYXNoYm9hcmQoKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHNldERhdGEocmVzcG9uc2UuZGF0YSkgLy8geyBtZXNzYWdlOiAnSGVsbG8gV29ybGQnIH1cbiAgICAgICAgc2V0VXNlcnMocmVzcG9uc2UuZGF0YS51c2VycylcbiAgICAgICAgc2V0Q2xpZW50c1MxKHJlc3BvbnNlLmRhdGEuY2xpZW50cylcbiAgICAgICAgc2V0RW1wbG95ZWVzKHJlc3BvbnNlLmRhdGEuZW1wbG95ZWVzKVxuICAgICAgICBzZXRFeHBlbnNlKHJlc3BvbnNlLmRhdGEuZXhwZW5zZSlcbiAgICAgICAgc2V0SW5jb21lKHJlc3BvbnNlLmRhdGEuaW5jb21lKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIC8vIGhhbmRsZSBhbnkgZXJyb3JzXG4gICAgICB9KTtcbiAgfSwgW10pXG4gIGNvbnN0IHsgdHJhbnNsYXRlTWVzc2FnZSwgdHJhbnNsYXRlQnV0dG9uIH0gPSB1c2VUcmFuc2xhdGlvbigpXG5cbiAgLy8gICBjb25zdCB1c2VyTWFya3VwID0gdXNlcnMubWFwKCh1c2VyKT0+e1xuICAvLyAgICAgLy8gY29uc3QgY2xpZW50UzFNYXJrdXAgPSBjbGllbnRzUzEubWFwKChjbGllbnRTMSk9PntcbiAgLy8gICAgIHJldHVybihcbiAgLy8gICAgICAgPHRyPlxuICAvLyAgICAgICA8dGQ+e3VzZXIuZW1haWx9PC90ZD5cbiAgLy8gICAgICAgPHRkPnt1c2VyLnJvbGV9PC90ZD5cbiAgLy8gICAgIDwvdHI+XG4gIC8vICAgKVxuICAgICAgXG4gIC8vIH0pXG5cbiAgLy8gY29uc3QgY2xpZW50TWFya3VwID0gY2xpZW50c1MxLm1hcCgoY2xpZW50KT0+e1xuICAvLyAgIHJldHVybihcbiAgLy8gICAgIDx0cj57Y2xpZW50Lm5hbWV9PC90cj5cbiAgLy8gICApXG4gIC8vIH0pXG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgIHtcbiAgICAgIGRhdGEgIT09IG51bGwgJiYgXG4gICAgICA8ZGl2PlxuICAgICAgICB7LyogPHN0eWxlPlxuICAgICAgICB7XCJib2R5XCI6e1wiZm9udFNpemVcIjpcIjE4cHhcIixcImZvbnRXZWlnaHRcIjpcIjQwMFwifSxcInBfeV8yXCI6e1wicGFkZGluZ1RvcFwiOlwiMjhweFwiLFwicGFkZGluZ0JvdHRvbVwiOlwiMjhweFwifSxcInBfeV8zXCI6e1wicGFkZGluZ1RvcFwiOlwiNDVweFwiLFwicGFkZGluZ0JvdHRvbVwiOlwiNDVweFwifSxcIm1fYl8xXCI6e1wibWFyZ2luQm90dG9tXCI6XCIxOHB4XCJ9LFwibV90XzFcIjp7XCJtYXJnaW5Ub3BcIjpcIjE4cHhcIn0sXCJtYWluX2NvdW50ZXJfYXJlYVwiOntcImJhY2tncm91bmRTaXplXCI6XCJjb3ZlclwiLFwib3ZlcmZsb3dcIjpcImhpZGRlblwifSxcIm1haW5fY291bnRlcl9hcmVhX19tYWluX2NvdW50ZXJfY29udGVudF9fc2luZ2xlX2NvdW50ZXJcIjp7XCJiYWNrZ3JvdW5kXCI6XCIjMDAwMDAwXCIsXCJjb2xvclwiOlwiI2ZmZlwifSxcIm1haW5fY291bnRlcl9hcmVhX19tYWluX2NvdW50ZXJfY29udGVudF9fc2luZ2xlX2NvdW50ZXJfaVwiOntcImZvbnRTaXplXCI6XCIzNnB4XCJ9fVxuICAgICAgICA8L3N0eWxlPiAqL31cbiAgICAgIHsvKiA5ODc5OTggKi99XG4gICAgIFxuICAgICB7LyogPHRhYmxlPlxuICAgICAgPHRib2R5PlxuICAgICAgICB7Y2xpZW50TWFya3VwfVxuICAgICAgPC90Ym9keT5cbiAgICAgPC90YWJsZT5cbiAgICAgICovfVxuICAgICAgICB7LyogPHNlY3Rpb24gaWQ9XCJjb3VudGVyXCIgY2xhc3NOYW1lPVwiY291bnRlclwiPlxuICAgICAgICAgXG4gIDxkaXYgY2xhc3NOYW1lPVwibWFpbl9jb3VudGVyX2FyZWFcIj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm92ZXJsYXkgcC15LTNcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haW5fY291bnRlcl9jb250ZW50ICB0ZXh0LWNlbnRlciB3aGl0ZS10ZXh0IHdvdyBmYWRlSW5VcFwiIHN0eWxlPXt7ZGlzcGxheTonJ319PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQgXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2luZ2xlX2NvdW50ZXIgcC15LTIgbS10LTFcIj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWJyaWVmY2FzZSBtLWItMVwiIC8+XG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvdXNlcnMucG5nXCIgYWx0PVwidXNlcnNcIiAvPlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJzdGF0aXN0aWMtY291bnRlclwiPnsoZGF0YS51c2Vycy5sZW5ndGgpfTwvaDI+XG4gICAgICAgICAgICAgICAgPHNwYW4gLz5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPHA+VXNlcnM8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNpbmdsZV9jb3VudGVyIHAteS0yIG0tdC0xXCI+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY2hlY2sgbS1iLTFcIiAvPlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJzdGF0aXN0aWMtY291bnRlclwiPnsoZGF0YS5jbGllbnRzLmxlbmd0aCl9PC9oMj5cbiAgICAgICAgICAgICAgICA8cD5DbGllbnRzPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaW5nbGVfY291bnRlciBwLXktMiBtLXQtMVwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNvZmZlZSBtLWItMVwiIC8+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInN0YXRpc3RpYy1jb3VudGVyXCI+eyhkYXRhLmVtcGxveWVlcy5sZW5ndGgpfTwvaDI+XG4gICAgICAgICAgICAgICAgPHA+RW1wbG95ZWVzIDwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2luZ2xlX2NvdW50ZXIgcC15LTIgbS10LTFcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1iZWVyIG0tYi0xXCIgLz5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwic3RhdGlzdGljLWNvdW50ZXJcIj57KGRhdGEuZXhwZW5zZS5sZW5ndGgpfTwvaDI+XG4gICAgICAgICAgICAgICAgPHA+RXhwZW5zZTwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2luZ2xlX2NvdW50ZXIgcC15LTIgbS10LTFcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1iZWVyIG0tYi0xXCIgLz5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwic3RhdGlzdGljLWNvdW50ZXJcIj57KGRhdGEuaW5jb21lLmxlbmd0aCl9PC9oMj5cbiAgICAgICAgICAgICAgICA8cD5JbmNvbWU8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9zZWN0aW9uPiAqL31cbiAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid293IGZhZGVJbiBhbmltYXRlZFwiIHN0eWxlPXt7dmlzaWJpbGl0eTogJ3Zpc2libGUnLCBhbmltYXRpb25OYW1lOiAnZmFkZUluJ319PlxuICAgIFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCIgPlxuICAgICAgICAgIDxoMSBzdHlsZT17e2ZvbnRTaXplOicxMDBweCcsIHBvc2l0aW9uOidhYnNvbHV0ZScscGFkZGluZ1RvcDo4MCwgZm9udEZhbWlseTonc2VyaWYnfX0+RmFyaXNodGEgRW50ZXJwcmlzZTwvaDE+XG4gICAgICAgICAgICAgPGltZyBzcmM9XCIvYmc0LmpwZWdcIiBhbHQ9XCJqamRoXCIgc3R5bGU9e3ttYXJnaW5Ub3A6MCwgcGFkZGluZ1RvcDowLHBvc2l0aW9uOidyZWxpdGl2ZSd9fS8+XG4gICAgICAgICAgICB7LyogY291bnRlciAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTMgY29sLXNtLTYgYm90dG9tLW1hcmdpbiB0ZXh0LWNlbnRlciBjb3VudGVyLXNlY3Rpb24gd293IGZhZGVJblVwIHNtLW1hcmdpbi1ib3R0b20tdGVuIGFuaW1hdGVkXCIgZGF0YS13b3ctZHVyYXRpb249XCIzMDBtc1wiIHN0eWxlPXt7dmlzaWJpbGl0eTogJ3Zpc2libGUnLCBhbmltYXRpb25EdXJhdGlvbjogJzMwMG1zJywgYW5pbWF0aW9uTmFtZTogJ2ZhZGVJblVwJ319PlxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi91c2Vycy5wbmdcIiBhbHQ9XCJ1c2Vyc1wiIC8+XG4gICAgICAgICAgICAgIDxzcGFuIGlkPVwiYW5pbS1udW1iZXItcGl6emFcIiBjbGFzc05hbWU9XCJjb3VudGVyLW51bWJlclwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRpbWVyIGNvdW50ZXIgYWx0LWZvbnQgYXBwZWFyXCIgZGF0YS10bz17OTgwfSBkYXRhLXNwZWVkPXs3MDAwfT57KGRhdGEudXNlcnMubGVuZ3RoKX08L3NwYW4+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImNvdW50ZXItdGl0bGVcIj5Ub3RhbCBhY3RpdmUgVXNlcnM8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHsvKiBlbmQgY291bnRlciAqL31cbiAgICAgICAgICAgIHsvKiBjb3VudGVyICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMyBjb2wtc20tNiBib3R0b20tbWFyZ2luIHRleHQtY2VudGVyIGNvdW50ZXItc2VjdGlvbiB3b3cgZmFkZUluVXAgc20tbWFyZ2luLWJvdHRvbS10ZW4gYW5pbWF0ZWRcIiBkYXRhLXdvdy1kdXJhdGlvbj1cIjYwMG1zXCIgc3R5bGU9e3t2aXNpYmlsaXR5OiAndmlzaWJsZScsIGFuaW1hdGlvbkR1cmF0aW9uOiAnNjAwbXMnLCBhbmltYXRpb25OYW1lOiAnZmFkZUluVXAnfX0+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIvY2xpZW50cy5wbmdcIiBhbHQ9XCJjbGllbnRzXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGltZXIgY291bnRlciBhbHQtZm9udCBhcHBlYXJcIiBkYXRhLXRvPXs5ODB9IGRhdGEtc3BlZWQ9ezcwMDB9PnsoZGF0YS5jbGllbnRzLmxlbmd0aCl9PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjb3VudGVyLXRpdGxlXCI+VG90YWwgQ2xpZW50czwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgey8qIGVuZCBjb3VudGVyICovfVxuICAgICAgICAgICAgey8qIGNvdW50ZXIgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0zIGNvbC1zbS02IGJvdHRvbS1tYXJnaW4tc21hbGwgdGV4dC1jZW50ZXIgY291bnRlci1zZWN0aW9uIHdvdyBmYWRlSW5VcCB4cy1tYXJnaW4tYm90dG9tLXRlbiBhbmltYXRlZFwiIGRhdGEtd293LWR1cmF0aW9uPVwiOTAwbXNcIiBzdHlsZT17e3Zpc2liaWxpdHk6ICd2aXNpYmxlJywgYW5pbWF0aW9uRHVyYXRpb246ICc5MDBtcycsIGFuaW1hdGlvbk5hbWU6ICdmYWRlSW5VcCd9fT5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwiL2VtcGxveWVlLnBuZ1wiIGFsdD1cImVtcGxveWVlXCIgLz5cbiAgICAgICAgIFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0aW1lciBjb3VudGVyIGFsdC1mb250IGFwcGVhclwiIGRhdGEtdG89ezgxMH0gZGF0YS1zcGVlZD17NzAwMH0+eyhkYXRhLmVtcGxveWVlcy5sZW5ndGgpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY291bnRlci10aXRsZVwiPk51bWJlciBvZiB3b3JraW5nIEVtcGxveWVlczwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgey8qIGVuZCBjb3VudGVyICovfVxuICAgICAgICAgICAgey8qIGNvdW50ZXIgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0zIGNvbC1zbS02IHRleHQtY2VudGVyIGNvdW50ZXItc2VjdGlvbiB3b3cgZmFkZUluVXAgYW5pbWF0ZWRcIiBkYXRhLXdvdy1kdXJhdGlvbj1cIjEyMDBtc1wiIHN0eWxlPXt7dmlzaWJpbGl0eTogJ3Zpc2libGUnLCBhbmltYXRpb25EdXJhdGlvbjogJzEyMDBtcycsIGFuaW1hdGlvbk5hbWU6ICdmYWRlSW5VcCd9fT5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwiL2V4cGVuY2VzLnBuZ1wiIGFsdD1cImV4cGVuY2VzXCIgLz5cbiAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGltZXIgY291bnRlciBhbHQtZm9udCBhcHBlYXJcIiBkYXRhLXRvPXs2MDB9IGRhdGEtc3BlZWQ9ezcwMDB9PnsoZGF0YS5leHBlbnNlLmxlbmd0aCl9PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjb3VudGVyLXRpdGxlXCI+Q2xpZW50cyBleHBlbnNlIGVudHJpZXM8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHsvKiBlbmQgY291bnRlciAqL31cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIDwvZGl2PlxuICAgIH1cbiAgICA8Lz5cbiAgICBcbiAgKVxufVxuXG4gICAgXG5leHBvcnQgZGVmYXVsdCBEYXNoYm9hcmRcblxuXG5cbi8vIDxoMSBzdHlsZT17e2JhY2tncm91bmRDb2xvcjonI2ZmZmZmJ319PnsoZGF0YS5tZXNzYWdlKX08L2gxPlxuLy8gPGgxIHN0eWxlPXt7YmFja2dyb3VuZENvbG9yOicjZmZmZmYnfX0+eyhkYXRhLnVzZXJzLmxlbmd0aCl9PC9oMT5cbi8vIDx0YWJsZSBjbGFzc05hbWU9J2NvbnRhaW5lciBiZy1wcmltYXJ5Jz5cbi8vICAgPHRib2R5PlxuLy8gICAgIHt1c2VyTWFya3VwfVxuICAgIFxuLy8gICA8L3Rib2R5PlxuLy8gPC90YWJsZT4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge3Byb3BzfSBmcm9tICdhZG1pbmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBFeHBlbnNlVG90YWwocHJvcHMpIHtcbiAgICBjb25zdCB7cmVjb3JkLHByb3BlcnR5fSA9IHByb3BzXG5jb25zdCB7cGFyYW1zfSA9IHJlY29yZFxuICAgIGNvbnN0IHN1bSA9IHBhcmFtcy5NZWRpY2FsX2V4cGVuc2VzICsgcGFyYW1zLlBha2lzdGFuX09mZmljZV9leHAgKyBwYXJhbXMuUGFraXN0YW5fU2FsICsgcGFyYW1zLlBha2lzdGFuX0dvdl9mZWUgKyBwYXJhbXMuUGFraXN0YW5fQ29taXNzaW9uICsgcGFyYW1zLk90aGVyc19QYWtpc3Rhbl9leHAgKyBwYXJhbXMuTWFsYXlzaWFfT2ZmaWNlX2V4cCArIHBhcmFtcy5NYWxheXNpYV9zYWwgKyBwYXJhbXMuTWFsYXlzaWFfR292X2ZlZSArIHBhcmFtcy5NYWxheXNpYV9Db21pc3Npb24gKyBwYXJhbXMuT3RoZXJzX01hbGF5c2lhX2V4cFxuXG4gICAgY29uc29sZS5sb2coJ1dvcmtpbmcnKTtcblxuICAgIGNvbnNvbGUubG9nKHBhcmFtcylcbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJib3hfX0JveC1zYy0xN3NicTNwLTAgYnVQelp4IGFkbWluanNfQm94XCI+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJsYWJlbF9fTGFiZWwtc2MtbzkwczdkLTAganFreGIgYWRtaW5qc19MYWJlbFwiPkV4cGVuc2UgVG90YWw8L2xhYmVsPlxuICAgICAgICB7c3VtfVxuICAgICAgICA8L3NlY3Rpb24+XG4gIClcbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7cHJvcHN9IGZyb20gJ2FkbWluanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEluY29tZVRvdGFsKHByb3BzKSB7XG4gICAgY29uc3Qge3JlY29yZCxwcm9wZXJ0eX0gPSBwcm9wc1xuY29uc3Qge3BhcmFtc30gPSByZWNvcmRcbiAgICBjb25zdCBzdW0gPSBwYXJhbXMuQ2xpZW50X2luY29tZSArcGFyYW1zLkFnZW50X29yX0FnZW5jeV9pbmNvbWUgKyBwYXJhbXMuRW1wbG95ZXJfaW5jb21lICsgcGFyYW1zLm90aGVyX0luY29tZXMgXG5cbiAgICBjb25zb2xlLmxvZyhwYXJhbXMpXG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiYm94X19Cb3gtc2MtMTdzYnEzcC0wIGJ1UHpaeCBhZG1pbmpzX0JveFwiPlxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwibGFiZWxfX0xhYmVsLXNjLW85MHM3ZC0wIGpxa3hiIGFkbWluanNfTGFiZWxcIj5Ub3RhbCBJbmNvbWU8L2xhYmVsPlxuICAgICAgICB7c3VtfVxuICAgICAgICA8L3NlY3Rpb24+XG4gIClcbn1cbiIsImltcG9ydCBSZWFjdCx7dXNlU3RhdGUsdXNlRWZmZWN0fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7cHJvcHN9IGZyb20gJ2FkbWluanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENsaWVudEluY29tZVRvdGFsKHByb3BzKSB7XG4gICAgY29uc3Qge3JlY29yZCxwcm9wZXJ0eX0gPSBwcm9wc1xuICAgIGNvbnNvbGUubG9nKHJlY29yZCk7XG5jb25zdCB7cGFyYW1zfSA9IHJlY29yZFxuY29uc3QgaW5jb21lID0gcmVjb3JkLnBvcHVsYXRlZC5pbmNvbWUucGFyYW1zXG5jb25zb2xlLmxvZyhpbmNvbWUpO1xuXG5jb25zdCB1cmwgPXdpbmRvdy5sb2NhdGlvbi5ocmVmXG5jb25zdCBsYXN0UGFydCA9IHVybC5zcGxpdChcIi9cIikucG9wKCk7XG5jb25zb2xlLmxvZyhsYXN0UGFydClcblxuICBcbiAgICBcbiAgICAgIGNvbnN0IGNsaWVudHNpbmNvbWV0b3RhbCA9IGluY29tZS5DbGllbnRfaW5jb21lICsgaW5jb21lLkFnZW50X29yX0FnZW5jeV9pbmNvbWUgKyBpbmNvbWUuRW1wbG95ZXJfaW5jb21lICsgaW5jb21lLm90aGVyX0luY29tZXNcblxuICAgICAgaWYgKGxhc3RQYXJ0PT09J3Nob3cnKXtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJib3hfX0JveC1zYy0xN3NicTNwLTAgYnVQelp4IGFkbWluanNfQm94XCI+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImxhYmVsX19MYWJlbC1zYy1vOTBzN2QtMCBqcWt4YiBhZG1pbmpzX0xhYmVsXCI+Q2xpZW50IEluY29tZSBUb3RhbDwvbGFiZWw+XG4gIFxuICAgICAgICAgIHtjbGllbnRzaW5jb21ldG90YWx9XG4gICAgICAgICAgPC9zZWN0aW9uPlxuICAgIClcbiAgICAgIH1lbHNlXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICB7Y2xpZW50c2luY29tZXRvdGFsfVxuICAgICAgICA8L2Rpdj5cbiAgKVxufVxuIiwiaW1wb3J0IFJlYWN0LHt1c2VTdGF0ZSx1c2VFZmZlY3R9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtwcm9wc30gZnJvbSAnYWRtaW5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2xpZW50RXhwZW5zZVRvdGFsKHByb3BzKSB7XG4gICAgY29uc3Qge3JlY29yZCxwcm9wZXJ0eX0gPSBwcm9wc1xuICAgIGNvbnNvbGUubG9nKHJlY29yZCk7XG5jb25zdCB7cGFyYW1zfSA9IHJlY29yZFxuY29uc3QgZXhwZW5zZSA9IHJlY29yZC5wb3B1bGF0ZWQuZXhwZW5zZS5wYXJhbXNcbmNvbnNvbGUubG9nKGV4cGVuc2UpO1xuXG5jb25zdCB1cmwgPXdpbmRvdy5sb2NhdGlvbi5ocmVmXG5jb25zdCBsYXN0UGFydCA9IHVybC5zcGxpdChcIi9cIikucG9wKCk7XG5jb25zb2xlLmxvZyhsYXN0UGFydClcblxuICBcbiAgICBcbiAgICAgIGNvbnN0IGNsaWVudHNleHBlbnNldG90YWwgPSAgZXhwZW5zZS5NZWRpY2FsX2V4cGVuc2VzICsgZXhwZW5zZS5QYWtpc3Rhbl9PZmZpY2VfZXhwICsgZXhwZW5zZS5QYWtpc3Rhbl9TYWwgKyBleHBlbnNlLlBha2lzdGFuX0dvdl9mZWUgKyBleHBlbnNlLlBha2lzdGFuX0NvbWlzc2lvbiArIGV4cGVuc2UuT3RoZXJzX1Bha2lzdGFuX2V4cCArIGV4cGVuc2UuTWFsYXlzaWFfT2ZmaWNlX2V4cCArIGV4cGVuc2UuTWFsYXlzaWFfc2FsICsgZXhwZW5zZS5NYWxheXNpYV9Hb3ZfZmVlICsgZXhwZW5zZS5NYWxheXNpYV9Db21pc3Npb24gKyBleHBlbnNlLk90aGVyc19NYWxheXNpYV9leHBcblxuXG4gICAgICBjb25zb2xlLmxvZyhjbGllbnRzZXhwZW5zZXRvdGFsKTtcblxuICAgICAgaWYgKGxhc3RQYXJ0PT09J3Nob3cnKXtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJib3hfX0JveC1zYy0xN3NicTNwLTAgYnVQelp4IGFkbWluanNfQm94XCI+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImxhYmVsX19MYWJlbC1zYy1vOTBzN2QtMCBqcWt4YiBhZG1pbmpzX0xhYmVsXCI+IFRvdGFsIEV4cGVuc2U8L2xhYmVsPlxuICBcbiAgICAgICAgICB7Y2xpZW50c2V4cGVuc2V0b3RhbH1cbiAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgKVxuICAgICAgfWVsc2VcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgIHtjbGllbnRzZXhwZW5zZXRvdGFsfVxuICAgICAgICA8L2Rpdj5cbiAgKVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgQXBpQ2xpZW50LCBBY3Rpb25Qcm9wcyx1c2VDdXJyZW50QWRtaW4gfSBmcm9tICdhZG1pbmpzJ1xuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSdcblxuY29uc3QgR2VuZXJhdGVQZGYgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgW2N1cnJlbnRBZG1pbl0gPSB1c2VDdXJyZW50QWRtaW4oKTtcbiAgY29uc3QgeyByZWNvcmQsIHJlc291cmNlIH0gPSBwcm9wc1xuICBjb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KClcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGFwaS5yZWNvcmRBY3Rpb24oe1xuICAgICAgcmVjb3JkSWQ6IHJlY29yZC5pZCxcbiAgICAgIHJlc291cmNlSWQ6IHJlc291cmNlLmlkLFxuICAgICAgYWN0aW9uTmFtZTogJ1BkZkdlbidcbiAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YS51cmwpXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlc3BvbnNlLmRhdGEudXJsXG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpXG4gICAgfSlcbiAgfSwgW10pXG5cbiAgcmV0dXJuIDxMb2FkZXIgLz5cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2VuZXJhdGVQZGYiLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBDb21wb25lbnQwIGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvZWRpdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50MCA9IENvbXBvbmVudDBcbmltcG9ydCBDb21wb25lbnQxIGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvbGlzdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50MSA9IENvbXBvbmVudDFcbmltcG9ydCBDb21wb25lbnQyIGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvc2hvdydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50MiA9IENvbXBvbmVudDJcbmltcG9ydCBDb21wb25lbnQzIGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvZWRpdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50MyA9IENvbXBvbmVudDNcbmltcG9ydCBDb21wb25lbnQ0IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvbGlzdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50NCA9IENvbXBvbmVudDRcbmltcG9ydCBDb21wb25lbnQ1IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvc2hvdydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50NSA9IENvbXBvbmVudDVcbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi4vZGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5EYXNoYm9hcmQgPSBEYXNoYm9hcmRcbmltcG9ydCBFeHBlbnNlVG90YWwgZnJvbSAnLi4vY29tcG9uZW50L0V4cGVuc2VUb3RhbCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuRXhwZW5zZVRvdGFsID0gRXhwZW5zZVRvdGFsXG5pbXBvcnQgSW5jb21lVG90YWwgZnJvbSAnLi4vY29tcG9uZW50L0luY29tZVRvdGFsJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5JbmNvbWVUb3RhbCA9IEluY29tZVRvdGFsXG5pbXBvcnQgQ2xpZW50SW5jb21lVG90YWwgZnJvbSAnLi4vY29tcG9uZW50L0NsaWVudEluY29tZVRvdGFsJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5DbGllbnRJbmNvbWVUb3RhbCA9IENsaWVudEluY29tZVRvdGFsXG5pbXBvcnQgQ2xpZW50RXhwZW5zZVRvdGFsIGZyb20gJy4uL2NvbXBvbmVudC9DbGllbnRUb3RhbEV4cGVuc2UnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNsaWVudEV4cGVuc2VUb3RhbCA9IENsaWVudEV4cGVuc2VUb3RhbFxuaW1wb3J0IFBkZiBmcm9tICcuLi9jb21wb25lbnQvUERGR2VuZXJhdG9yJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5QZGYgPSBQZGYiXSwibmFtZXMiOlsiRWRpdCIsInByb3BlcnR5IiwicmVjb3JkIiwib25DaGFuZ2UiLCJwYXJhbXMiLCJjdXN0b20iLCJwYXRoIiwiZmxhdCIsImdldCIsImZpbGVQYXRoUHJvcGVydHkiLCJrZXkiLCJrZXlQcm9wZXJ0eSIsImZpbGUiLCJmaWxlUHJvcGVydHkiLCJ1c2VTdGF0ZSIsIm9yaWdpbmFsS2V5Iiwic2V0T3JpZ2luYWxLZXkiLCJmaWxlc1RvVXBsb2FkIiwic2V0RmlsZXNUb1VwbG9hZCIsInVzZUVmZmVjdCIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsIm9uVXBsb2FkIiwiZmlsZXMiLCJoYW5kbGVSZW1vdmUiLCJoYW5kbGVNdWx0aVJlbW92ZSIsInNpbmdsZUtleSIsImluZGV4IiwiaW5kZXhPZiIsImZpbGVzVG9EZWxldGUiLCJmaWxlc1RvRGVsZXRlUHJvcGVydHkiLCJuZXdQYXRoIiwibWFwIiwiY3VycmVudFBhdGgiLCJpIiwibmV3UGFyYW1zIiwic2V0IiwiY29uc29sZSIsImxvZyIsIlJlYWN0IiwiRm9ybUdyb3VwIiwiTGFiZWwiLCJsYWJlbCIsIkRyb3Bab25lIiwibXVsdGlwbGUiLCJtaW1lVHlwZXMiLCJtYXhTaXplIiwiRHJvcFpvbmVJdGVtIiwiQXVkaW9NaW1lVHlwZXMiLCJJbWFnZU1pbWVUeXBlcyIsIlNpbmdsZUZpbGUiLCJwcm9wcyIsIm5hbWUiLCJtaW1lVHlwZSIsIndpZHRoIiwiaW5jbHVkZXMiLCJtYXhIZWlnaHQiLCJtYXhXaWR0aCIsIkJveCIsIkJ1dHRvbiIsIkljb24iLCJGaWxlIiwiZmlsZU5hbWVQcm9wZXJ0eSIsIm1pbWVUeXBlUHJvcGVydHkiLCJvcHRzIiwiYmFzZVVybCIsInNpbmdsZVBhdGgiLCJMaXN0IiwiU2hvdyIsIkRhc2hib2FyZCIsInVzZUN1cnJlbnRBZG1pbiIsImRhdGEiLCJzZXREYXRhIiwic2V0VXNlcnMiLCJzZXRDbGllbnRzUzEiLCJzZXRFbXBsb3llZXMiLCJzZXRFeHBlbnNlIiwic2V0SW5jb21lIiwiYXBpIiwiQXBpQ2xpZW50IiwiZ2V0RGFzaGJvYXJkIiwidGhlbiIsInJlc3BvbnNlIiwidXNlcnMiLCJjbGllbnRzIiwiZW1wbG95ZWVzIiwiZXhwZW5zZSIsImluY29tZSIsImVycm9yIiwidXNlVHJhbnNsYXRpb24iLCJ0cmFuc2xhdGVNZXNzYWdlIiwidHJhbnNsYXRlQnV0dG9uIiwidmlzaWJpbGl0eSIsImFuaW1hdGlvbk5hbWUiLCJmb250U2l6ZSIsInBvc2l0aW9uIiwicGFkZGluZ1RvcCIsImZvbnRGYW1pbHkiLCJtYXJnaW5Ub3AiLCJhbmltYXRpb25EdXJhdGlvbiIsIkV4cGVuc2VUb3RhbCIsInN1bSIsIk1lZGljYWxfZXhwZW5zZXMiLCJQYWtpc3Rhbl9PZmZpY2VfZXhwIiwiUGFraXN0YW5fU2FsIiwiUGFraXN0YW5fR292X2ZlZSIsIlBha2lzdGFuX0NvbWlzc2lvbiIsIk90aGVyc19QYWtpc3Rhbl9leHAiLCJNYWxheXNpYV9PZmZpY2VfZXhwIiwiTWFsYXlzaWFfc2FsIiwiTWFsYXlzaWFfR292X2ZlZSIsIk1hbGF5c2lhX0NvbWlzc2lvbiIsIk90aGVyc19NYWxheXNpYV9leHAiLCJJbmNvbWVUb3RhbCIsIkNsaWVudF9pbmNvbWUiLCJBZ2VudF9vcl9BZ2VuY3lfaW5jb21lIiwiRW1wbG95ZXJfaW5jb21lIiwib3RoZXJfSW5jb21lcyIsIkNsaWVudEluY29tZVRvdGFsIiwicG9wdWxhdGVkIiwidXJsIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwibGFzdFBhcnQiLCJzcGxpdCIsInBvcCIsImNsaWVudHNpbmNvbWV0b3RhbCIsIkNsaWVudEV4cGVuc2VUb3RhbCIsImNsaWVudHNleHBlbnNldG90YWwiLCJHZW5lcmF0ZVBkZiIsInJlc291cmNlIiwicmVjb3JkQWN0aW9uIiwicmVjb3JkSWQiLCJpZCIsInJlc291cmNlSWQiLCJhY3Rpb25OYW1lIiwiZXJyIiwiTG9hZGVyIiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIiwiQ29tcG9uZW50MCIsIkNvbXBvbmVudDEiLCJDb21wb25lbnQyIiwiQ29tcG9uZW50MyIsIkNvbXBvbmVudDQiLCJDb21wb25lbnQ1IiwiUGRmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFLQSxJQUFNQSxJQUEyQixHQUFHLFNBQTlCQSxJQUEyQixDQUF1QyxJQUFBLEVBQUE7SUFBQSxJQUFqQ0MsUUFBUSxRQUFSQSxRQUFRO0VBQUVDLElBQUFBLE1BQU0sUUFBTkEsTUFBTTtFQUFFQyxJQUFBQSxRQUFRLFFBQVJBLFFBQVEsQ0FBQTtFQUMvRCxFQUFBLElBQVFDLE1BQU0sR0FBS0YsTUFBTSxDQUFqQkUsTUFBTSxDQUFBO0VBQ2QsRUFBQSxJQUFBLEtBQUEsR0FBbUJILFFBQVE7RUFBbkJJLElBQUFBLE1BQU0sU0FBTkEsTUFBTSxDQUFBO0lBRWQsSUFBTUMsSUFBSSxHQUFHQyxZQUFJLENBQUNDLEdBQUcsQ0FBQ0osTUFBTSxFQUFFQyxNQUFNLENBQUNJLGdCQUFnQixDQUFDLENBQUE7SUFDdEQsSUFBTUMsR0FBRyxHQUFHSCxZQUFJLENBQUNDLEdBQUcsQ0FBQ0osTUFBTSxFQUFFQyxNQUFNLENBQUNNLFdBQVcsQ0FBQyxDQUFBO0lBQ2hELElBQU1DLElBQUksR0FBR0wsWUFBSSxDQUFDQyxHQUFHLENBQUNKLE1BQU0sRUFBRUMsTUFBTSxDQUFDUSxZQUFZLENBQUMsQ0FBQTtJQUVsRCxJQUFzQ0MsU0FBQUEsR0FBQUEsY0FBUSxDQUFDSixHQUFHLENBQUM7RUFBQSxJ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
