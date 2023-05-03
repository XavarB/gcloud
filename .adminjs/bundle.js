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
    var sum = parseInt(params.Medical_expenses) + parseInt(params.Pakistan_Office_exp) + parseInt(params.Pakistan_Sal) + parseInt(params.Pakistan_Gov_fee) + parseInt(params.Pakistan_Comission) + parseInt(params.Others_Pakistan_exp) + parseInt(params.Malaysia_Office_exp) + parseInt(params.Malaysia_sal) + parseInt(params.Malaysia_Gov_fee) + parseInt(params.Malaysia_Comission) + parseInt(params.Others_Malaysia_exp);
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
    var sum = parseInt(params.Client_income) + parseInt(params.Agent_or_Agency_income) + parseInt(params.Employer_income) + parseInt(params.other_Incomes);
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
    var clientsincometotal = parseInt(income.Client_income) + parseInt(income.Agent_or_Agency_income) + parseInt(income.Employer_income) + parseInt(income.other_Incomes);
    if (lastPart === 'show') {
      return /*#__PURE__*/React__default["default"].createElement("section", {
        className: "box__Box-sc-17sbq3p-0 buPzZx adminjs_Box"
      }, /*#__PURE__*/React__default["default"].createElement("label", {
        className: "label__Label-sc-o90s7d-0 jqkxb adminjs_Label"
      }, "Client Income Total"), clientsincometotal);
    } else return /*#__PURE__*/React__default["default"].createElement("div", null, clientsincometotal);
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

  var BulkGeneratePdf = function BulkGeneratePdf(props) {
    var _useCurrentAdmin = adminjs.useCurrentAdmin(),
      _useCurrentAdmin2 = _slicedToArray(_useCurrentAdmin, 1);
      _useCurrentAdmin2[0];
    var records = props.records;
      props.resource;
    var api = new adminjs.ApiClient();
    var recordIds = records.map(function (record) {
      return record.id;
    });
    console.log(recordIds);
    React.useEffect(function () {
      console.log('here');
      api.bulkAction({
        recordIds: recordIds,
        resourceId: 'ClientsS1',
        actionName: 'bulkPdf'
      }).then(function (response) {
        console.log(response.data.url);
        window.location.href = response.data.url;
      })["catch"](function (err) {
        console.error(err);
        console.log('Error');
      });
    }, []);
    return /*#__PURE__*/React__default["default"].createElement(designSystem.Loader, null);
  };

  function Paymentpayable(props) {
    var record = props.record;
      props.property;
    var params = record.params;
    var sum = parseInt(params.Total_payment) - parseInt(params.Payment_paid);
    console.log(params);
    return /*#__PURE__*/React__default["default"].createElement("section", {
      className: "box__Box-sc-17sbq3p-0 buPzZx adminjs_Box"
    }, /*#__PURE__*/React__default["default"].createElement("label", {
      className: "label__Label-sc-o90s7d-0 jqkxb adminjs_Label"
    }, "Paymentpayable"), sum);
  }

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
  AdminJS.UserComponents.Pdf = GeneratePdf;
  AdminJS.UserComponents.BulkPdfGen = BulkGeneratePdf;
  AdminJS.UserComponents.Paymentpayable = Paymentpayable;

})(React, AdminJS, AdminJSDesignSystem);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL2VkaXQudHN4IiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvdHlwZXMvbWltZS10eXBlcy50eXBlLnRzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9maWxlLnRzeCIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvbGlzdC50c3giLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL3Nob3cudHN4IiwiLi4vZGFzaGJvYXJkLmpzeCIsIi4uL2NvbXBvbmVudC9FeHBlbnNlVG90YWwuanN4IiwiLi4vY29tcG9uZW50L0luY29tZVRvdGFsLmpzeCIsIi4uL2NvbXBvbmVudC9DbGllbnRJbmNvbWVUb3RhbC5qc3giLCIuLi9jb21wb25lbnQvUERGR2VuZXJhdG9yLmpzeCIsIi4uL2NvbXBvbmVudC9CdWxrUERGZ2VuZXJhdG9yLmpzeCIsIi4uL2NvbXBvbmVudC9QYXltZW50cGF5YWJsZS5qc3giLCIuZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IEZDLCB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBFZGl0UHJvcGVydHlQcm9wcywgZmxhdCB9IGZyb20gJ2FkbWluanMnXG5pbXBvcnQgeyBEcm9wWm9uZSwgRm9ybUdyb3VwLCBMYWJlbCwgRHJvcFpvbmVJdGVtIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSdcbmltcG9ydCBQcm9wZXJ0eUN1c3RvbSBmcm9tICcuLi90eXBlcy9wcm9wZXJ0eS1jdXN0b20udHlwZSdcblxuY29uc3QgRWRpdDogRkM8RWRpdFByb3BlcnR5UHJvcHM+ID0gKHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UgfSkgPT4ge1xuICBjb25zdCB7IHBhcmFtcyB9ID0gcmVjb3JkXG4gIGNvbnN0IHsgY3VzdG9tIH0gPSBwcm9wZXJ0eSBhcyB1bmtub3duIGFzIHsgY3VzdG9tOiBQcm9wZXJ0eUN1c3RvbSB9XG5cbiAgY29uc3QgcGF0aCA9IGZsYXQuZ2V0KHBhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHkpXG4gIGNvbnN0IGtleSA9IGZsYXQuZ2V0KHBhcmFtcywgY3VzdG9tLmtleVByb3BlcnR5KVxuICBjb25zdCBmaWxlID0gZmxhdC5nZXQocGFyYW1zLCBjdXN0b20uZmlsZVByb3BlcnR5KVxuXG4gIGNvbnN0IFtvcmlnaW5hbEtleSwgc2V0T3JpZ2luYWxLZXldID0gdXNlU3RhdGUoa2V5KVxuICBjb25zdCBbZmlsZXNUb1VwbG9hZCwgc2V0RmlsZXNUb1VwbG9hZF0gPSB1c2VTdGF0ZTxBcnJheTxGaWxlPj4oW10pXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyBpdCBtZWFucyBtZWFucyB0aGF0IHNvbWVvbmUgaGl0IHNhdmUgYW5kIG5ldyBmaWxlIGhhcyBiZWVuIHVwbG9hZGVkXG4gICAgLy8gaW4gdGhpcyBjYXNlIGZsaWVzVG9VcGxvYWQgc2hvdWxkIGJlIGNsZWFyZWQuXG4gICAgLy8gVGhpcyBoYXBwZW5zIHdoZW4gdXNlciB0dXJucyBvZmYgcmVkaXJlY3QgYWZ0ZXIgbmV3L2VkaXRcbiAgICBpZiAoXG4gICAgICAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycgJiYga2V5ICE9PSBvcmlnaW5hbEtleSlcbiAgICAgIHx8ICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyAmJiAhb3JpZ2luYWxLZXkpXG4gICAgICB8fCAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgJiYgQXJyYXkuaXNBcnJheShrZXkpICYmIGtleS5sZW5ndGggIT09IG9yaWdpbmFsS2V5Lmxlbmd0aClcbiAgICApIHtcbiAgICAgIHNldE9yaWdpbmFsS2V5KGtleSlcbiAgICAgIHNldEZpbGVzVG9VcGxvYWQoW10pXG4gICAgfVxuICB9LCBba2V5LCBvcmlnaW5hbEtleV0pXG5cbiAgY29uc3Qgb25VcGxvYWQgPSAoZmlsZXM6IEFycmF5PEZpbGU+KTogdm9pZCA9PiB7XG4gICAgc2V0RmlsZXNUb1VwbG9hZChmaWxlcylcbiAgICBvbkNoYW5nZShjdXN0b20uZmlsZVByb3BlcnR5LCBmaWxlcylcbiAgfVxuXG4gIGNvbnN0IGhhbmRsZVJlbW92ZSA9ICgpID0+IHtcbiAgICBvbkNoYW5nZShjdXN0b20uZmlsZVByb3BlcnR5LCBudWxsKVxuICB9XG5cbiAgY29uc3QgaGFuZGxlTXVsdGlSZW1vdmUgPSAoc2luZ2xlS2V5KSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSAoZmxhdC5nZXQocmVjb3JkLnBhcmFtcywgY3VzdG9tLmtleVByb3BlcnR5KSB8fCBbXSkuaW5kZXhPZihzaW5nbGVLZXkpXG4gICAgY29uc3QgZmlsZXNUb0RlbGV0ZSA9IGZsYXQuZ2V0KHJlY29yZC5wYXJhbXMsIGN1c3RvbS5maWxlc1RvRGVsZXRlUHJvcGVydHkpIHx8IFtdXG4gICAgaWYgKFxuICAgICAgcGF0aCAmJiBwYXRoLmxlbmd0aCA+IDBcbiAgICApIHtcbiAgICAgIGNvbnN0IG5ld1BhdGggPSBwYXRoLm1hcCgoY3VycmVudFBhdGgsIGkpID0+IChpICE9PSBpbmRleCA/IGN1cnJlbnRQYXRoIDogbnVsbCkpXG4gICAgICBsZXQgbmV3UGFyYW1zID0gZmxhdC5zZXQoXG4gICAgICAgIHJlY29yZC5wYXJhbXMsXG4gICAgICAgIGN1c3RvbS5maWxlc1RvRGVsZXRlUHJvcGVydHksXG4gICAgICAgIFsuLi5maWxlc1RvRGVsZXRlLCBpbmRleF0sXG4gICAgICApXG4gICAgICBuZXdQYXJhbXMgPSBmbGF0LnNldChuZXdQYXJhbXMsIGN1c3RvbS5maWxlUGF0aFByb3BlcnR5LCBuZXdQYXRoKVxuXG4gICAgICBvbkNoYW5nZSh7XG4gICAgICAgIC4uLnJlY29yZCxcbiAgICAgICAgcGFyYW1zOiBuZXdQYXJhbXMsXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS5sb2coJ1lvdSBjYW5ub3QgcmVtb3ZlIGZpbGUgd2hlbiB0aGVyZSBhcmUgbm8gdXBsb2FkZWQgZmlsZXMgeWV0JylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxGb3JtR3JvdXA+XG4gICAgICA8TGFiZWw+e3Byb3BlcnR5LmxhYmVsfTwvTGFiZWw+XG4gICAgICA8RHJvcFpvbmVcbiAgICAgICAgb25DaGFuZ2U9e29uVXBsb2FkfVxuICAgICAgICBtdWx0aXBsZT17Y3VzdG9tLm11bHRpcGxlfVxuICAgICAgICB2YWxpZGF0ZT17e1xuICAgICAgICAgIG1pbWVUeXBlczogY3VzdG9tLm1pbWVUeXBlcyBhcyBBcnJheTxzdHJpbmc+LFxuICAgICAgICAgIG1heFNpemU6IGN1c3RvbS5tYXhTaXplLFxuICAgICAgICB9fVxuICAgICAgICBmaWxlcz17ZmlsZXNUb1VwbG9hZH1cbiAgICAgIC8+XG4gICAgICB7IWN1c3RvbS5tdWx0aXBsZSAmJiBrZXkgJiYgcGF0aCAmJiAhZmlsZXNUb1VwbG9hZC5sZW5ndGggJiYgZmlsZSAhPT0gbnVsbCAmJiAoXG4gICAgICAgIDxEcm9wWm9uZUl0ZW0gZmlsZW5hbWU9e2tleX0gc3JjPXtwYXRofSBvblJlbW92ZT17aGFuZGxlUmVtb3ZlfSAvPlxuICAgICAgKX1cbiAgICAgIHtjdXN0b20ubXVsdGlwbGUgJiYga2V5ICYmIGtleS5sZW5ndGggJiYgcGF0aCA/IChcbiAgICAgICAgPD5cbiAgICAgICAgICB7a2V5Lm1hcCgoc2luZ2xlS2V5LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgLy8gd2hlbiB3ZSByZW1vdmUgaXRlbXMgd2Ugc2V0IG9ubHkgcGF0aCBpbmRleCB0byBudWxscy5cbiAgICAgICAgICAgIC8vIGtleSBpcyBzdGlsbCB0aGVyZS4gVGhpcyBpcyBiZWNhdXNlXG4gICAgICAgICAgICAvLyB3ZSBoYXZlIHRvIG1haW50YWluIGFsbCB0aGUgaW5kZXhlcy4gU28gaGVyZSB3ZSBzaW1wbHkgZmlsdGVyIG91dCBlbGVtZW50cyB3aGljaFxuICAgICAgICAgICAgLy8gd2VyZSByZW1vdmVkIGFuZCBkaXNwbGF5IG9ubHkgd2hhdCB3YXMgbGVmdFxuICAgICAgICAgICAgY29uc3QgY3VycmVudFBhdGggPSBwYXRoW2luZGV4XVxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQYXRoID8gKFxuICAgICAgICAgICAgICA8RHJvcFpvbmVJdGVtXG4gICAgICAgICAgICAgICAga2V5PXtzaW5nbGVLZXl9XG4gICAgICAgICAgICAgICAgZmlsZW5hbWU9e3NpbmdsZUtleX1cbiAgICAgICAgICAgICAgICBzcmM9e3BhdGhbaW5kZXhdfVxuICAgICAgICAgICAgICAgIG9uUmVtb3ZlPXsoKSA9PiBoYW5kbGVNdWx0aVJlbW92ZShzaW5nbGVLZXkpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6ICcnXG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvPlxuICAgICAgKSA6ICcnfVxuICAgIDwvRm9ybUdyb3VwPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEVkaXRcbiIsImV4cG9ydCBjb25zdCBBdWRpb01pbWVUeXBlcyA9IFtcbiAgJ2F1ZGlvL2FhYycsXG4gICdhdWRpby9taWRpJyxcbiAgJ2F1ZGlvL3gtbWlkaScsXG4gICdhdWRpby9tcGVnJyxcbiAgJ2F1ZGlvL29nZycsXG4gICdhcHBsaWNhdGlvbi9vZ2cnLFxuICAnYXVkaW8vb3B1cycsXG4gICdhdWRpby93YXYnLFxuICAnYXVkaW8vd2VibScsXG4gICdhdWRpby8zZ3BwMicsXG5dIGFzIGNvbnN0XG5cbmV4cG9ydCBjb25zdCBWaWRlb01pbWVUeXBlcyA9IFtcbiAgJ3ZpZGVvL3gtbXN2aWRlbycsXG4gICd2aWRlby9tcGVnJyxcbiAgJ3ZpZGVvL29nZycsXG4gICd2aWRlby9tcDJ0JyxcbiAgJ3ZpZGVvL3dlYm0nLFxuICAndmlkZW8vM2dwcCcsXG4gICd2aWRlby8zZ3BwMicsXG5dIGFzIGNvbnN0XG5cbmV4cG9ydCBjb25zdCBJbWFnZU1pbWVUeXBlcyA9IFtcbiAgJ2ltYWdlL2JtcCcsXG4gICdpbWFnZS9naWYnLFxuICAnaW1hZ2UvanBlZycsXG4gICdpbWFnZS9wbmcnLFxuICAnaW1hZ2Uvc3ZnK3htbCcsXG4gICdpbWFnZS92bmQubWljcm9zb2Z0Lmljb24nLFxuICAnaW1hZ2UvdGlmZicsXG4gICdpbWFnZS93ZWJwJyxcbl0gYXMgY29uc3RcblxuZXhwb3J0IGNvbnN0IENvbXByZXNzZWRNaW1lVHlwZXMgPSBbXG4gICdhcHBsaWNhdGlvbi94LWJ6aXAnLFxuICAnYXBwbGljYXRpb24veC1iemlwMicsXG4gICdhcHBsaWNhdGlvbi9nemlwJyxcbiAgJ2FwcGxpY2F0aW9uL2phdmEtYXJjaGl2ZScsXG4gICdhcHBsaWNhdGlvbi94LXRhcicsXG4gICdhcHBsaWNhdGlvbi96aXAnLFxuICAnYXBwbGljYXRpb24veC03ei1jb21wcmVzc2VkJyxcbl0gYXMgY29uc3RcblxuZXhwb3J0IGNvbnN0IERvY3VtZW50TWltZVR5cGVzID0gW1xuICAnYXBwbGljYXRpb24veC1hYml3b3JkJyxcbiAgJ2FwcGxpY2F0aW9uL3gtZnJlZWFyYycsXG4gICdhcHBsaWNhdGlvbi92bmQuYW1hem9uLmVib29rJyxcbiAgJ2FwcGxpY2F0aW9uL21zd29yZCcsXG4gICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQud29yZHByb2Nlc3NpbmdtbC5kb2N1bWVudCcsXG4gICdhcHBsaWNhdGlvbi92bmQubXMtZm9udG9iamVjdCcsXG4gICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnByZXNlbnRhdGlvbicsXG4gICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnNwcmVhZHNoZWV0JyxcbiAgJ2FwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQudGV4dCcsXG4gICdhcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludCcsXG4gICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQucHJlc2VudGF0aW9ubWwucHJlc2VudGF0aW9uJyxcbiAgJ2FwcGxpY2F0aW9uL3ZuZC5yYXInLFxuICAnYXBwbGljYXRpb24vcnRmJyxcbiAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbCcsXG4gICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQuc3ByZWFkc2hlZXRtbC5zaGVldCcsXG5dIGFzIGNvbnN0XG5cbmV4cG9ydCBjb25zdCBUZXh0TWltZVR5cGVzID0gW1xuICAndGV4dC9jc3MnLFxuICAndGV4dC9jc3YnLFxuICAndGV4dC9odG1sJyxcbiAgJ3RleHQvY2FsZW5kYXInLFxuICAndGV4dC9qYXZhc2NyaXB0JyxcbiAgJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAnYXBwbGljYXRpb24vbGQranNvbicsXG4gICd0ZXh0L2phdmFzY3JpcHQnLFxuICAndGV4dC9wbGFpbicsXG4gICdhcHBsaWNhdGlvbi94aHRtbCt4bWwnLFxuICAnYXBwbGljYXRpb24veG1sJyxcbiAgJ3RleHQveG1sJyxcbl0gYXMgY29uc3RcblxuZXhwb3J0IGNvbnN0IEJpbmFyeURvY3NNaW1lVHlwZXMgPSBbXG4gICdhcHBsaWNhdGlvbi9lcHViK3ppcCcsXG4gICdhcHBsaWNhdGlvbi9wZGYnLFxuXSBhcyBjb25zdFxuXG5leHBvcnQgY29uc3QgRm9udE1pbWVUeXBlcyA9IFtcbiAgJ2ZvbnQvb3RmJyxcbiAgJ2ZvbnQvdHRmJyxcbiAgJ2ZvbnQvd29mZicsXG4gICdmb250L3dvZmYyJyxcbl0gYXMgY29uc3RcblxuZXhwb3J0IGNvbnN0IE90aGVyTWltZVR5cGVzID0gW1xuICAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyxcbiAgJ2FwcGxpY2F0aW9uL3gtY3NoJyxcbiAgJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5pbnN0YWxsZXIreG1sJyxcbiAgJ2FwcGxpY2F0aW9uL3gtaHR0cGQtcGhwJyxcbiAgJ2FwcGxpY2F0aW9uL3gtc2gnLFxuICAnYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnLFxuICAndm5kLnZpc2lvJyxcbiAgJ2FwcGxpY2F0aW9uL3ZuZC5tb3ppbGxhLnh1bCt4bWwnLFxuXSBhcyBjb25zdFxuXG5leHBvcnQgY29uc3QgTWltZVR5cGVzID0gW1xuICAuLi5BdWRpb01pbWVUeXBlcyxcbiAgLi4uVmlkZW9NaW1lVHlwZXMsXG4gIC4uLkltYWdlTWltZVR5cGVzLFxuICAuLi5Db21wcmVzc2VkTWltZVR5cGVzLFxuICAuLi5Eb2N1bWVudE1pbWVUeXBlcyxcbiAgLi4uVGV4dE1pbWVUeXBlcyxcbiAgLi4uQmluYXJ5RG9jc01pbWVUeXBlcyxcbiAgLi4uT3RoZXJNaW1lVHlwZXMsXG4gIC4uLkZvbnRNaW1lVHlwZXMsXG4gIC4uLk90aGVyTWltZVR5cGVzLFxuXVxuXG50eXBlIFBvcHVsYXJNaW1lVHlwZXMgPSB0eXBlb2YgTWltZVR5cGVzW251bWJlcl1cblxuZXhwb3J0IHR5cGUgTWltZVR5cGUgPSBQb3B1bGFyTWltZVR5cGVzIHwge1xuICBba2V5OiBzdHJpbmddOiBzdHJpbmdcbn1cbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXNcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBJY29uIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSdcbmltcG9ydCB7IGZsYXQsIFNob3dQcm9wZXJ0eVByb3BzIH0gZnJvbSAnYWRtaW5qcydcbmltcG9ydCBSZWFjdCwgeyBGQyB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgQXVkaW9NaW1lVHlwZXMsIEltYWdlTWltZVR5cGVzIH0gZnJvbSAnLi4vdHlwZXMvbWltZS10eXBlcy50eXBlJ1xuaW1wb3J0IFByb3BlcnR5Q3VzdG9tIGZyb20gJy4uL3R5cGVzL3Byb3BlcnR5LWN1c3RvbS50eXBlJ1xuXG50eXBlIFByb3BzID0gU2hvd1Byb3BlcnR5UHJvcHMgJiB7XG4gIHdpZHRoPzogbnVtYmVyIHwgc3RyaW5nO1xufTtcblxudHlwZSBTaW5nbGVGaWxlUHJvcHMgPSB7XG4gIG5hbWU6IHN0cmluZztcbiAgcGF0aD86IHN0cmluZztcbiAgbWltZVR5cGU/OiBzdHJpbmc7XG4gIHdpZHRoPzogbnVtYmVyIHwgc3RyaW5nO1xufTtcblxuY29uc3QgU2luZ2xlRmlsZTogRkM8U2luZ2xlRmlsZVByb3BzPiA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IG5hbWUsIHBhdGgsIG1pbWVUeXBlLCB3aWR0aCB9ID0gcHJvcHNcblxuICBpZiAocGF0aCAmJiBwYXRoLmxlbmd0aCkge1xuICAgIGlmIChtaW1lVHlwZSAmJiBJbWFnZU1pbWVUeXBlcy5pbmNsdWRlcyhtaW1lVHlwZSBhcyBhbnkpKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8aW1nXG4gICAgICAgICAgc3JjPXtwYXRofVxuICAgICAgICAgIHN0eWxlPXt7IG1heEhlaWdodDogd2lkdGgsIG1heFdpZHRoOiB3aWR0aCB9fVxuICAgICAgICAgIGFsdD17bmFtZX1cbiAgICAgICAgLz5cbiAgICAgIClcbiAgICB9XG4gICAgaWYgKG1pbWVUeXBlICYmIEF1ZGlvTWltZVR5cGVzLmluY2x1ZGVzKG1pbWVUeXBlIGFzIGFueSkpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxhdWRpbyBjb250cm9scyBzcmM9e3BhdGh9PlxuICAgICAgICAgIFlvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZVxuICAgICAgICAgIDxjb2RlPmF1ZGlvPC9jb2RlPlxuICAgICAgICAgIDx0cmFjayBraW5kPVwiY2FwdGlvbnNcIiAvPlxuICAgICAgICA8L2F1ZGlvPlxuICAgICAgKVxuICAgIH1cbiAgfVxuICByZXR1cm4gKFxuICAgIDxCb3g+XG4gICAgICA8QnV0dG9uIGFzPVwiYVwiIGhyZWY9e3BhdGh9IG1sPVwiZGVmYXVsdFwiIHNpemU9XCJzbVwiIHJvdW5kZWQgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgIDxJY29uIGljb249XCJEb2N1bWVudERvd25sb2FkXCIgY29sb3I9XCJ3aGl0ZVwiIG1yPVwiZGVmYXVsdFwiIC8+XG4gICAgICAgIHtuYW1lfVxuICAgICAgPC9CdXR0b24+XG4gICAgPC9Cb3g+XG4gIClcbn1cblxuY29uc3QgRmlsZTogRkM8UHJvcHM+ID0gKHsgd2lkdGgsIHJlY29yZCwgcHJvcGVydHkgfSkgPT4ge1xuICBjb25zdCB7IGN1c3RvbSB9ID0gcHJvcGVydHkgYXMgdW5rbm93biBhcyB7IGN1c3RvbTogUHJvcGVydHlDdXN0b20gfVxuXG4gIGxldCBwYXRoID0gZmxhdC5nZXQocmVjb3JkPy5wYXJhbXMsIGN1c3RvbS5maWxlUGF0aFByb3BlcnR5KVxuXG4gIGlmICghcGF0aCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBjb25zdCBuYW1lID0gZmxhdC5nZXQoXG4gICAgcmVjb3JkPy5wYXJhbXMsXG4gICAgY3VzdG9tLmZpbGVOYW1lUHJvcGVydHkgPyBjdXN0b20uZmlsZU5hbWVQcm9wZXJ0eSA6IGN1c3RvbS5rZXlQcm9wZXJ0eSxcbiAgKVxuXG4gIGNvbnN0IG1pbWVUeXBlID0gY3VzdG9tLm1pbWVUeXBlUHJvcGVydHlcbiAgICAmJiBmbGF0LmdldChyZWNvcmQ/LnBhcmFtcywgY3VzdG9tLm1pbWVUeXBlUHJvcGVydHkpXG5cbiAgaWYgKCFwcm9wZXJ0eS5jdXN0b20ubXVsdGlwbGUpIHtcbiAgICBpZiAoY3VzdG9tLm9wdHMgJiYgY3VzdG9tLm9wdHMuYmFzZVVybCkge1xuICAgICAgcGF0aCA9IGAke2N1c3RvbS5vcHRzLmJhc2VVcmx9LyR7bmFtZX1gXG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8U2luZ2xlRmlsZSBwYXRoPXtwYXRofSBuYW1lPXtuYW1lfSB3aWR0aD17d2lkdGh9IG1pbWVUeXBlPXttaW1lVHlwZX0gLz5cbiAgICApXG4gIH1cbiAgaWYgKGN1c3RvbS5vcHRzICYmIGN1c3RvbS5vcHRzLmJhc2VVcmwpIHtcbiAgICBjb25zdCBiYXNlVXJsID0gY3VzdG9tLm9wdHMuYmFzZVVybCB8fCAnJ1xuICAgIHBhdGggPSBwYXRoLm1hcCgoc2luZ2xlUGF0aCwgaW5kZXgpID0+IGAke2Jhc2VVcmx9LyR7bmFtZVtpbmRleF19YClcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtwYXRoLm1hcCgoc2luZ2xlUGF0aCwgaW5kZXgpID0+IChcbiAgICAgICAgPFNpbmdsZUZpbGVcbiAgICAgICAgICBrZXk9e3NpbmdsZVBhdGh9XG4gICAgICAgICAgcGF0aD17c2luZ2xlUGF0aH1cbiAgICAgICAgICBuYW1lPXtuYW1lW2luZGV4XX1cbiAgICAgICAgICB3aWR0aD17d2lkdGh9XG4gICAgICAgICAgbWltZVR5cGU9e21pbWVUeXBlW2luZGV4XX1cbiAgICAgICAgLz5cbiAgICAgICkpfVxuICAgIDwvPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEZpbGVcbiIsImltcG9ydCBSZWFjdCwgeyBGQyB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgU2hvd1Byb3BlcnR5UHJvcHMgfSBmcm9tICdhZG1pbmpzJ1xuXG5pbXBvcnQgRmlsZSBmcm9tICcuL2ZpbGUnXG5cbmNvbnN0IExpc3Q6IEZDPFNob3dQcm9wZXJ0eVByb3BzPiA9IChwcm9wcykgPT4gKDxGaWxlIHdpZHRoPXsxMDB9IHsuLi5wcm9wc30gLz4pXG5cbmV4cG9ydCBkZWZhdWx0IExpc3RcbiIsImltcG9ydCBSZWFjdCwgeyBGQyB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgU2hvd1Byb3BlcnR5UHJvcHMgfSBmcm9tICdhZG1pbmpzJ1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBMYWJlbCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nXG5cbmltcG9ydCBGaWxlIGZyb20gJy4vZmlsZSdcblxuY29uc3QgU2hvdzogRkM8U2hvd1Byb3BlcnR5UHJvcHM+ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgcHJvcGVydHkgfSA9IHByb3BzXG5cbiAgcmV0dXJuIChcbiAgICA8Rm9ybUdyb3VwPlxuICAgICAgPExhYmVsPntwcm9wZXJ0eS5sYWJlbH08L0xhYmVsPlxuICAgICAgPEZpbGUgd2lkdGg9XCIxMDAlXCIgey4uLnByb3BzfSAvPlxuICAgIDwvRm9ybUdyb3VwPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBBcGlDbGllbnQsdXNlQ3VycmVudEFkbWluIH0gZnJvbSAnYWRtaW5qcydcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnXG5pbXBvcnQge1xuICBCb3gsXG4gIEgyLFxuICBINSxcbiAgSDQsXG4gIFRleHQsXG4gIElsbHVzdHJhdGlvbixcbiAgSWxsdXN0cmF0aW9uUHJvcHMsXG4gIEJ1dHRvbixcbn0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSdcbmltcG9ydCB7IHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAnYWRtaW5qcydcblxuXG5cbmV4cG9ydCAgZnVuY3Rpb24gRGFzaGJvYXJkKCkgIHtcbiAgY29uc3QgW2N1cnJlbnRBZG1pbl0gPSB1c2VDdXJyZW50QWRtaW4oKTtcbiAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGUobnVsbClcbiAgY29uc3QgW3VzZXJzLHNldFVzZXJzXSA9IHVzZVN0YXRlKFtdKVxuICBjb25zdCBbY2xpZW50c1MxLHNldENsaWVudHNTMV0gPSB1c2VTdGF0ZShbXSlcbiAgY29uc3QgW2VtcGxveWVlcyxzZXRFbXBsb3llZXNdID0gdXNlU3RhdGUoW10pXG4gIGNvbnN0IFtleHBlbnNlLHNldEV4cGVuc2VdID0gdXNlU3RhdGUoW10pXG4gIGNvbnN0IFtpbmNvbWUsc2V0SW5jb21lXSA9IHVzZVN0YXRlKFtdKVxuICBjb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KClcbiAgXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgYXBpLmdldERhc2hib2FyZCgpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgc2V0RGF0YShyZXNwb25zZS5kYXRhKSAvLyB7IG1lc3NhZ2U6ICdIZWxsbyBXb3JsZCcgfVxuICAgICAgICBzZXRVc2VycyhyZXNwb25zZS5kYXRhLnVzZXJzKVxuICAgICAgICBzZXRDbGllbnRzUzEocmVzcG9uc2UuZGF0YS5jbGllbnRzKVxuICAgICAgICBzZXRFbXBsb3llZXMocmVzcG9uc2UuZGF0YS5lbXBsb3llZXMpXG4gICAgICAgIHNldEV4cGVuc2UocmVzcG9uc2UuZGF0YS5leHBlbnNlKVxuICAgICAgICBzZXRJbmNvbWUocmVzcG9uc2UuZGF0YS5pbmNvbWUpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgLy8gaGFuZGxlIGFueSBlcnJvcnNcbiAgICAgIH0pO1xuICB9LCBbXSlcbiAgY29uc3QgeyB0cmFuc2xhdGVNZXNzYWdlLCB0cmFuc2xhdGVCdXR0b24gfSA9IHVzZVRyYW5zbGF0aW9uKClcblxuICAvLyAgIGNvbnN0IHVzZXJNYXJrdXAgPSB1c2Vycy5tYXAoKHVzZXIpPT57XG4gIC8vICAgICAvLyBjb25zdCBjbGllbnRTMU1hcmt1cCA9IGNsaWVudHNTMS5tYXAoKGNsaWVudFMxKT0+e1xuICAvLyAgICAgcmV0dXJuKFxuICAvLyAgICAgICA8dHI+XG4gIC8vICAgICAgIDx0ZD57dXNlci5lbWFpbH08L3RkPlxuICAvLyAgICAgICA8dGQ+e3VzZXIucm9sZX08L3RkPlxuICAvLyAgICAgPC90cj5cbiAgLy8gICApXG4gICAgICBcbiAgLy8gfSlcblxuICAvLyBjb25zdCBjbGllbnRNYXJrdXAgPSBjbGllbnRzUzEubWFwKChjbGllbnQpPT57XG4gIC8vICAgcmV0dXJuKFxuICAvLyAgICAgPHRyPntjbGllbnQubmFtZX08L3RyPlxuICAvLyAgIClcbiAgLy8gfSlcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAge1xuICAgICAgZGF0YSAhPT0gbnVsbCAmJiBcbiAgICAgIDxkaXY+XG4gICAgICAgIHsvKiA8c3R5bGU+XG4gICAgICAgIHtcImJvZHlcIjp7XCJmb250U2l6ZVwiOlwiMThweFwiLFwiZm9udFdlaWdodFwiOlwiNDAwXCJ9LFwicF95XzJcIjp7XCJwYWRkaW5nVG9wXCI6XCIyOHB4XCIsXCJwYWRkaW5nQm90dG9tXCI6XCIyOHB4XCJ9LFwicF95XzNcIjp7XCJwYWRkaW5nVG9wXCI6XCI0NXB4XCIsXCJwYWRkaW5nQm90dG9tXCI6XCI0NXB4XCJ9LFwibV9iXzFcIjp7XCJtYXJnaW5Cb3R0b21cIjpcIjE4cHhcIn0sXCJtX3RfMVwiOntcIm1hcmdpblRvcFwiOlwiMThweFwifSxcIm1haW5fY291bnRlcl9hcmVhXCI6e1wiYmFja2dyb3VuZFNpemVcIjpcImNvdmVyXCIsXCJvdmVyZmxvd1wiOlwiaGlkZGVuXCJ9LFwibWFpbl9jb3VudGVyX2FyZWFfX21haW5fY291bnRlcl9jb250ZW50X19zaW5nbGVfY291bnRlclwiOntcImJhY2tncm91bmRcIjpcIiMwMDAwMDBcIixcImNvbG9yXCI6XCIjZmZmXCJ9LFwibWFpbl9jb3VudGVyX2FyZWFfX21haW5fY291bnRlcl9jb250ZW50X19zaW5nbGVfY291bnRlcl9pXCI6e1wiZm9udFNpemVcIjpcIjM2cHhcIn19XG4gICAgICAgIDwvc3R5bGU+ICovfVxuICAgICAgey8qIDk4Nzk5OCAqL31cbiAgICAgXG4gICAgIHsvKiA8dGFibGU+XG4gICAgICA8dGJvZHk+XG4gICAgICAgIHtjbGllbnRNYXJrdXB9XG4gICAgICA8L3Rib2R5PlxuICAgICA8L3RhYmxlPlxuICAgICAgKi99XG4gICAgICAgIHsvKiA8c2VjdGlvbiBpZD1cImNvdW50ZXJcIiBjbGFzc05hbWU9XCJjb3VudGVyXCI+XG4gICAgICAgICBcbiAgPGRpdiBjbGFzc05hbWU9XCJtYWluX2NvdW50ZXJfYXJlYVwiPlxuICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmxheSBwLXktM1wiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFpbl9jb3VudGVyX2NvbnRlbnQgIHRleHQtY2VudGVyIHdoaXRlLXRleHQgd293IGZhZGVJblVwXCIgc3R5bGU9e3tkaXNwbGF5OicnfX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZCBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaW5nbGVfY291bnRlciBwLXktMiBtLXQtMVwiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtYnJpZWZjYXNlIG0tYi0xXCIgLz5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi91c2Vycy5wbmdcIiBhbHQ9XCJ1c2Vyc1wiIC8+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInN0YXRpc3RpYy1jb3VudGVyXCI+eyhkYXRhLnVzZXJzLmxlbmd0aCl9PC9oMj5cbiAgICAgICAgICAgICAgICA8c3BhbiAvPlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8cD5Vc2VyczwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2luZ2xlX2NvdW50ZXIgcC15LTIgbS10LTFcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1jaGVjayBtLWItMVwiIC8+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInN0YXRpc3RpYy1jb3VudGVyXCI+eyhkYXRhLmNsaWVudHMubGVuZ3RoKX08L2gyPlxuICAgICAgICAgICAgICAgIDxwPkNsaWVudHM8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNpbmdsZV9jb3VudGVyIHAteS0yIG0tdC0xXCI+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY29mZmVlIG0tYi0xXCIgLz5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwic3RhdGlzdGljLWNvdW50ZXJcIj57KGRhdGEuZW1wbG95ZWVzLmxlbmd0aCl9PC9oMj5cbiAgICAgICAgICAgICAgICA8cD5FbXBsb3llZXMgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaW5nbGVfY291bnRlciBwLXktMiBtLXQtMVwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWJlZXIgbS1iLTFcIiAvPlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJzdGF0aXN0aWMtY291bnRlclwiPnsoZGF0YS5leHBlbnNlLmxlbmd0aCl9PC9oMj5cbiAgICAgICAgICAgICAgICA8cD5FeHBlbnNlPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaW5nbGVfY291bnRlciBwLXktMiBtLXQtMVwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWJlZXIgbS1iLTFcIiAvPlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJzdGF0aXN0aWMtY291bnRlclwiPnsoZGF0YS5pbmNvbWUubGVuZ3RoKX08L2gyPlxuICAgICAgICAgICAgICAgIDxwPkluY29tZTwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3NlY3Rpb24+ICovfVxuICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3b3cgZmFkZUluIGFuaW1hdGVkXCIgc3R5bGU9e3t2aXNpYmlsaXR5OiAndmlzaWJsZScsIGFuaW1hdGlvbk5hbWU6ICdmYWRlSW4nfX0+XG4gICAgXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIiA+XG4gICAgICAgICAgPGgxIHN0eWxlPXt7Zm9udFNpemU6JzEwMHB4JywgcG9zaXRpb246J2Fic29sdXRlJyxwYWRkaW5nVG9wOjgwLCBmb250RmFtaWx5OidzZXJpZid9fT5GYXJpc2h0YSBFbnRlcnByaXNlPC9oMT5cbiAgICAgICAgICAgICA8aW1nIHNyYz1cIi9iZzQuanBlZ1wiIGFsdD1cImpqZGhcIiBzdHlsZT17e21hcmdpblRvcDowLCBwYWRkaW5nVG9wOjAscG9zaXRpb246J3JlbGl0aXZlJ319Lz5cbiAgICAgICAgICAgIHsvKiBjb3VudGVyICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMyBjb2wtc20tNiBib3R0b20tbWFyZ2luIHRleHQtY2VudGVyIGNvdW50ZXItc2VjdGlvbiB3b3cgZmFkZUluVXAgc20tbWFyZ2luLWJvdHRvbS10ZW4gYW5pbWF0ZWRcIiBkYXRhLXdvdy1kdXJhdGlvbj1cIjMwMG1zXCIgc3R5bGU9e3t2aXNpYmlsaXR5OiAndmlzaWJsZScsIGFuaW1hdGlvbkR1cmF0aW9uOiAnMzAwbXMnLCBhbmltYXRpb25OYW1lOiAnZmFkZUluVXAnfX0+XG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiL3VzZXJzLnBuZ1wiIGFsdD1cInVzZXJzXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4gaWQ9XCJhbmltLW51bWJlci1waXp6YVwiIGNsYXNzTmFtZT1cImNvdW50ZXItbnVtYmVyXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGltZXIgY291bnRlciBhbHQtZm9udCBhcHBlYXJcIiBkYXRhLXRvPXs5ODB9IGRhdGEtc3BlZWQ9ezcwMDB9PnsoZGF0YS51c2Vycy5sZW5ndGgpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiY291bnRlci10aXRsZVwiPlRvdGFsIGFjdGl2ZSBVc2VyczwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgey8qIGVuZCBjb3VudGVyICovfVxuICAgICAgICAgICAgey8qIGNvdW50ZXIgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0zIGNvbC1zbS02IGJvdHRvbS1tYXJnaW4gdGV4dC1jZW50ZXIgY291bnRlci1zZWN0aW9uIHdvdyBmYWRlSW5VcCBzbS1tYXJnaW4tYm90dG9tLXRlbiBhbmltYXRlZFwiIGRhdGEtd293LWR1cmF0aW9uPVwiNjAwbXNcIiBzdHlsZT17e3Zpc2liaWxpdHk6ICd2aXNpYmxlJywgYW5pbWF0aW9uRHVyYXRpb246ICc2MDBtcycsIGFuaW1hdGlvbk5hbWU6ICdmYWRlSW5VcCd9fT5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9jbGllbnRzLnBuZ1wiIGFsdD1cImNsaWVudHNcIiAvPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0aW1lciBjb3VudGVyIGFsdC1mb250IGFwcGVhclwiIGRhdGEtdG89ezk4MH0gZGF0YS1zcGVlZD17NzAwMH0+eyhkYXRhLmNsaWVudHMubGVuZ3RoKX08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNvdW50ZXItdGl0bGVcIj5Ub3RhbCBDbGllbnRzPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7LyogZW5kIGNvdW50ZXIgKi99XG4gICAgICAgICAgICB7LyogY291bnRlciAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTMgY29sLXNtLTYgYm90dG9tLW1hcmdpbi1zbWFsbCB0ZXh0LWNlbnRlciBjb3VudGVyLXNlY3Rpb24gd293IGZhZGVJblVwIHhzLW1hcmdpbi1ib3R0b20tdGVuIGFuaW1hdGVkXCIgZGF0YS13b3ctZHVyYXRpb249XCI5MDBtc1wiIHN0eWxlPXt7dmlzaWJpbGl0eTogJ3Zpc2libGUnLCBhbmltYXRpb25EdXJhdGlvbjogJzkwMG1zJywgYW5pbWF0aW9uTmFtZTogJ2ZhZGVJblVwJ319PlxuICAgICAgICAgICAgPGltZyBzcmM9XCIvZW1wbG95ZWUucG5nXCIgYWx0PVwiZW1wbG95ZWVcIiAvPlxuICAgICAgICAgXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRpbWVyIGNvdW50ZXIgYWx0LWZvbnQgYXBwZWFyXCIgZGF0YS10bz17ODEwfSBkYXRhLXNwZWVkPXs3MDAwfT57KGRhdGEuZW1wbG95ZWVzLmxlbmd0aCl9PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjb3VudGVyLXRpdGxlXCI+TnVtYmVyIG9mIHdvcmtpbmcgRW1wbG95ZWVzPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7LyogZW5kIGNvdW50ZXIgKi99XG4gICAgICAgICAgICB7LyogY291bnRlciAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTMgY29sLXNtLTYgdGV4dC1jZW50ZXIgY291bnRlci1zZWN0aW9uIHdvdyBmYWRlSW5VcCBhbmltYXRlZFwiIGRhdGEtd293LWR1cmF0aW9uPVwiMTIwMG1zXCIgc3R5bGU9e3t2aXNpYmlsaXR5OiAndmlzaWJsZScsIGFuaW1hdGlvbkR1cmF0aW9uOiAnMTIwMG1zJywgYW5pbWF0aW9uTmFtZTogJ2ZhZGVJblVwJ319PlxuICAgICAgICAgICAgPGltZyBzcmM9XCIvZXhwZW5jZXMucG5nXCIgYWx0PVwiZXhwZW5jZXNcIiAvPlxuICAgICAgICAgICAgIFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0aW1lciBjb3VudGVyIGFsdC1mb250IGFwcGVhclwiIGRhdGEtdG89ezYwMH0gZGF0YS1zcGVlZD17NzAwMH0+eyhkYXRhLmV4cGVuc2UubGVuZ3RoKX08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNvdW50ZXItdGl0bGVcIj5DbGllbnRzIGV4cGVuc2UgZW50cmllczwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgey8qIGVuZCBjb3VudGVyICovfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgPC9kaXY+XG4gICAgfVxuICAgIDwvPlxuICAgIFxuICApXG59XG5cbiAgICBcbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZFxuXG5cblxuLy8gPGgxIHN0eWxlPXt7YmFja2dyb3VuZENvbG9yOicjZmZmZmYnfX0+eyhkYXRhLm1lc3NhZ2UpfTwvaDE+XG4vLyA8aDEgc3R5bGU9e3tiYWNrZ3JvdW5kQ29sb3I6JyNmZmZmZid9fT57KGRhdGEudXNlcnMubGVuZ3RoKX08L2gxPlxuLy8gPHRhYmxlIGNsYXNzTmFtZT0nY29udGFpbmVyIGJnLXByaW1hcnknPlxuLy8gICA8dGJvZHk+XG4vLyAgICAge3VzZXJNYXJrdXB9XG4gICAgXG4vLyAgIDwvdGJvZHk+XG4vLyA8L3RhYmxlPiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7cHJvcHN9IGZyb20gJ2FkbWluanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEV4cGVuc2VUb3RhbChwcm9wcykge1xuICAgIGNvbnN0IHtyZWNvcmQscHJvcGVydHl9ID0gcHJvcHNcbmNvbnN0IHtwYXJhbXN9ID0gcmVjb3JkXG4gICAgY29uc3Qgc3VtID0gcGFyc2VJbnQocGFyYW1zLk1lZGljYWxfZXhwZW5zZXMpICsgcGFyc2VJbnQocGFyYW1zLlBha2lzdGFuX09mZmljZV9leHApICsgcGFyc2VJbnQocGFyYW1zLlBha2lzdGFuX1NhbCkgKyBwYXJzZUludChwYXJhbXMuUGFraXN0YW5fR292X2ZlZSkgKyBwYXJzZUludChwYXJhbXMuUGFraXN0YW5fQ29taXNzaW9uKSArIHBhcnNlSW50KHBhcmFtcy5PdGhlcnNfUGFraXN0YW5fZXhwKSArIHBhcnNlSW50KHBhcmFtcy5NYWxheXNpYV9PZmZpY2VfZXhwKSArIHBhcnNlSW50KHBhcmFtcy5NYWxheXNpYV9zYWwpICsgcGFyc2VJbnQocGFyYW1zLk1hbGF5c2lhX0dvdl9mZWUpICsgcGFyc2VJbnQocGFyYW1zLk1hbGF5c2lhX0NvbWlzc2lvbiApKyBwYXJzZUludChwYXJhbXMuT3RoZXJzX01hbGF5c2lhX2V4cClcblxuICAgIGNvbnNvbGUubG9nKCdXb3JraW5nJyk7XG5cbiAgICBjb25zb2xlLmxvZyhwYXJhbXMpXG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiYm94X19Cb3gtc2MtMTdzYnEzcC0wIGJ1UHpaeCBhZG1pbmpzX0JveFwiPlxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwibGFiZWxfX0xhYmVsLXNjLW85MHM3ZC0wIGpxa3hiIGFkbWluanNfTGFiZWxcIj5FeHBlbnNlIFRvdGFsPC9sYWJlbD5cbiAgICAgICAge3N1bX1cbiAgICAgICAgPC9zZWN0aW9uPlxuICApXG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge3Byb3BzfSBmcm9tICdhZG1pbmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBJbmNvbWVUb3RhbChwcm9wcykge1xuICAgIGNvbnN0IHtyZWNvcmQscHJvcGVydHl9ID0gcHJvcHNcbmNvbnN0IHtwYXJhbXN9ID0gcmVjb3JkXG4gICAgY29uc3Qgc3VtID0gcGFyc2VJbnQoIHBhcmFtcy5DbGllbnRfaW5jb21lICkgKyBwYXJzZUludChwYXJhbXMuQWdlbnRfb3JfQWdlbmN5X2luY29tZSkgKyBwYXJzZUludChwYXJhbXMuRW1wbG95ZXJfaW5jb21lKSArIHBhcnNlSW50KHBhcmFtcy5vdGhlcl9JbmNvbWVzKSBcblxuICAgIGNvbnNvbGUubG9nKHBhcmFtcylcbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJib3hfX0JveC1zYy0xN3NicTNwLTAgYnVQelp4IGFkbWluanNfQm94XCI+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJsYWJlbF9fTGFiZWwtc2MtbzkwczdkLTAganFreGIgYWRtaW5qc19MYWJlbFwiPlRvdGFsIEluY29tZTwvbGFiZWw+XG4gICAgICAgIHtzdW19XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgKVxufVxuIiwiaW1wb3J0IFJlYWN0LHt1c2VTdGF0ZSx1c2VFZmZlY3R9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtwcm9wc30gZnJvbSAnYWRtaW5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2xpZW50SW5jb21lVG90YWwocHJvcHMpIHtcbiAgICBjb25zdCB7cmVjb3JkLHByb3BlcnR5fSA9IHByb3BzXG4gICAgY29uc29sZS5sb2cocmVjb3JkKTtcbmNvbnN0IHtwYXJhbXN9ID0gcmVjb3JkXG5jb25zdCBpbmNvbWUgPSByZWNvcmQucG9wdWxhdGVkLmluY29tZS5wYXJhbXNcbmNvbnNvbGUubG9nKGluY29tZSk7XG5cbmNvbnN0IHVybCA9d2luZG93LmxvY2F0aW9uLmhyZWZcbmNvbnN0IGxhc3RQYXJ0ID0gdXJsLnNwbGl0KFwiL1wiKS5wb3AoKTtcbmNvbnNvbGUubG9nKGxhc3RQYXJ0KVxuXG4gIFxuICAgIFxuICAgICAgY29uc3QgY2xpZW50c2luY29tZXRvdGFsID0gcGFyc2VJbnQoaW5jb21lLkNsaWVudF9pbmNvbWUpICsgcGFyc2VJbnQoaW5jb21lLkFnZW50X29yX0FnZW5jeV9pbmNvbWUgKSsgcGFyc2VJbnQoaW5jb21lLkVtcGxveWVyX2luY29tZSApKyBwYXJzZUludChpbmNvbWUub3RoZXJfSW5jb21lcylcblxuICAgICAgaWYgKGxhc3RQYXJ0PT09J3Nob3cnKXtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJib3hfX0JveC1zYy0xN3NicTNwLTAgYnVQelp4IGFkbWluanNfQm94XCI+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImxhYmVsX19MYWJlbC1zYy1vOTBzN2QtMCBqcWt4YiBhZG1pbmpzX0xhYmVsXCI+Q2xpZW50IEluY29tZSBUb3RhbDwvbGFiZWw+XG4gIFxuICAgICAgICAgIHtjbGllbnRzaW5jb21ldG90YWx9XG4gICAgICAgICAgPC9zZWN0aW9uPlxuICAgIClcbiAgICAgIH1lbHNlXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICB7Y2xpZW50c2luY29tZXRvdGFsfVxuICAgICAgICA8L2Rpdj5cbiAgKVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgQXBpQ2xpZW50LCBBY3Rpb25Qcm9wcyx1c2VDdXJyZW50QWRtaW4gfSBmcm9tICdhZG1pbmpzJ1xuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSdcblxuY29uc3QgR2VuZXJhdGVQZGYgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgW2N1cnJlbnRBZG1pbl0gPSB1c2VDdXJyZW50QWRtaW4oKTtcbiAgY29uc3QgeyByZWNvcmQsIHJlc291cmNlIH0gPSBwcm9wc1xuICBjb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KClcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGFwaS5yZWNvcmRBY3Rpb24oe1xuICAgICAgcmVjb3JkSWQ6IHJlY29yZC5pZCxcbiAgICAgIHJlc291cmNlSWQ6IHJlc291cmNlLmlkLFxuICAgICAgYWN0aW9uTmFtZTogJ1BkZkdlbidcbiAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YS51cmwpXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlc3BvbnNlLmRhdGEudXJsXG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpXG4gICAgfSlcbiAgfSwgW10pXG5cbiAgcmV0dXJuIDxMb2FkZXIgLz5cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2VuZXJhdGVQZGYiLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBBcGlDbGllbnQsIEFjdGlvblByb3BzLHVzZUN1cnJlbnRBZG1pbiB9IGZyb20gJ2FkbWluanMnXG5pbXBvcnQgeyBMb2FkZXIgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJ1xuXG5jb25zdCBCdWxrR2VuZXJhdGVQZGYgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCBbY3VycmVudEFkbWluXSA9IHVzZUN1cnJlbnRBZG1pbigpO1xuICAgIGNvbnN0IHsgcmVjb3JkcywgcmVzb3VyY2UgfSA9IHByb3BzXG4gICAgY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpXG5cbiAgICBjb25zdCByZWNvcmRJZHMgPSByZWNvcmRzLm1hcChyZWNvcmQ9PntcbiAgICAgICAgcmV0dXJuIHJlY29yZC5pZFxuICAgIH0pXG5cbiAgICBjb25zb2xlLmxvZyhyZWNvcmRJZHMpXG4gICAgXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKCdoZXJlJylcbiAgICAgIGFwaS5idWxrQWN0aW9uKHtcbiAgICAgICAgcmVjb3JkSWRzOiByZWNvcmRJZHMsXG4gICAgICAgIHJlc291cmNlSWQ6ICdDbGllbnRzUzEnLFxuICAgICAgICBhY3Rpb25OYW1lOiAnYnVsa1BkZidcbiAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEudXJsKVxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlc3BvbnNlLmRhdGEudXJsXG4gICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgICAgICBjb25zb2xlLmxvZygnRXJyb3InKVxuICAgICAgfSlcbiAgICB9LCBbXSlcbiAgXG4gICAgcmV0dXJuIDxMb2FkZXIgLz5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQnVsa0dlbmVyYXRlUGRmIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtwcm9wc30gZnJvbSAnYWRtaW5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGF5bWVudHBheWFibGUocHJvcHMpIHtcbiAgICBjb25zdCB7cmVjb3JkLHByb3BlcnR5fSA9IHByb3BzXG5jb25zdCB7cGFyYW1zfSA9IHJlY29yZFxuICAgIGNvbnN0IHN1bSA9IHBhcnNlSW50KHBhcmFtcy5Ub3RhbF9wYXltZW50KSAtIHBhcnNlSW50KHBhcmFtcy5QYXltZW50X3BhaWQpIFxuXG4gICBcbiAgICBcblxuICAgIGNvbnNvbGUubG9nKHBhcmFtcylcbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJib3hfX0JveC1zYy0xN3NicTNwLTAgYnVQelp4IGFkbWluanNfQm94XCI+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJsYWJlbF9fTGFiZWwtc2MtbzkwczdkLTAganFreGIgYWRtaW5qc19MYWJlbFwiPlBheW1lbnRwYXlhYmxlPC9sYWJlbD5cbiAgICAgICAge3N1bX1cbiAgICAgICAgPC9zZWN0aW9uPlxuICApXG59XG4iLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBDb21wb25lbnQwIGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvZWRpdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50MCA9IENvbXBvbmVudDBcbmltcG9ydCBDb21wb25lbnQxIGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvbGlzdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50MSA9IENvbXBvbmVudDFcbmltcG9ydCBDb21wb25lbnQyIGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvc2hvdydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50MiA9IENvbXBvbmVudDJcbmltcG9ydCBDb21wb25lbnQzIGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvZWRpdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50MyA9IENvbXBvbmVudDNcbmltcG9ydCBDb21wb25lbnQ0IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvbGlzdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50NCA9IENvbXBvbmVudDRcbmltcG9ydCBDb21wb25lbnQ1IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvc2hvdydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50NSA9IENvbXBvbmVudDVcbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi4vZGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5EYXNoYm9hcmQgPSBEYXNoYm9hcmRcbmltcG9ydCBFeHBlbnNlVG90YWwgZnJvbSAnLi4vY29tcG9uZW50L0V4cGVuc2VUb3RhbCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuRXhwZW5zZVRvdGFsID0gRXhwZW5zZVRvdGFsXG5pbXBvcnQgSW5jb21lVG90YWwgZnJvbSAnLi4vY29tcG9uZW50L0luY29tZVRvdGFsJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5JbmNvbWVUb3RhbCA9IEluY29tZVRvdGFsXG5pbXBvcnQgQ2xpZW50SW5jb21lVG90YWwgZnJvbSAnLi4vY29tcG9uZW50L0NsaWVudEluY29tZVRvdGFsJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5DbGllbnRJbmNvbWVUb3RhbCA9IENsaWVudEluY29tZVRvdGFsXG5pbXBvcnQgUGRmIGZyb20gJy4uL2NvbXBvbmVudC9QREZHZW5lcmF0b3InXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlBkZiA9IFBkZlxuaW1wb3J0IEJ1bGtQZGZHZW4gZnJvbSAnLi4vY29tcG9uZW50L0J1bGtQREZnZW5lcmF0b3InXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkJ1bGtQZGZHZW4gPSBCdWxrUGRmR2VuXG5pbXBvcnQgUGF5bWVudHBheWFibGUgZnJvbSAnLi4vY29tcG9uZW50L1BheW1lbnRwYXlhYmxlJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5QYXltZW50cGF5YWJsZSA9IFBheW1lbnRwYXlhYmxlIl0sIm5hbWVzIjpbIkVkaXQiLCJwcm9wZXJ0eSIsInJlY29yZCIsIm9uQ2hhbmdlIiwicGFyYW1zIiwiY3VzdG9tIiwicGF0aCIsImZsYXQiLCJnZXQiLCJmaWxlUGF0aFByb3BlcnR5Iiwia2V5Iiwia2V5UHJvcGVydHkiLCJmaWxlIiwiZmlsZVByb3BlcnR5IiwidXNlU3RhdGUiLCJvcmlnaW5hbEtleSIsInNldE9yaWdpbmFsS2V5IiwiZmlsZXNUb1VwbG9hZCIsInNldEZpbGVzVG9VcGxvYWQiLCJ1c2VFZmZlY3QiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJvblVwbG9hZCIsImZpbGVzIiwiaGFuZGxlUmVtb3ZlIiwiaGFuZGxlTXVsdGlSZW1vdmUiLCJzaW5nbGVLZXkiLCJpbmRleCIsImluZGV4T2YiLCJmaWxlc1RvRGVsZXRlIiwiZmlsZXNUb0RlbGV0ZVByb3BlcnR5IiwibmV3UGF0aCIsIm1hcCIsImN1cnJlbnRQYXRoIiwiaSIsIm5ld1BhcmFtcyIsInNldCIsImNvbnNvbGUiLCJsb2ciLCJSZWFjdCIsIkZvcm1Hcm91cCIsIkxhYmVsIiwibGFiZWwiLCJEcm9wWm9uZSIsIm11bHRpcGxlIiwibWltZVR5cGVzIiwibWF4U2l6ZSIsIkRyb3Bab25lSXRlbSIsIkF1ZGlvTWltZVR5cGVzIiwiSW1hZ2VNaW1lVHlwZXMiLCJTaW5nbGVGaWxlIiwicHJvcHMiLCJuYW1lIiwibWltZVR5cGUiLCJ3aWR0aCIsImluY2x1ZGVzIiwibWF4SGVpZ2h0IiwibWF4V2lkdGgiLCJCb3giLCJCdXR0b24iLCJJY29uIiwiRmlsZSIsImZpbGVOYW1lUHJvcGVydHkiLCJtaW1lVHlwZVByb3BlcnR5Iiwib3B0cyIsImJhc2VVcmwiLCJzaW5nbGVQYXRoIiwiTGlzdCIsIlNob3ciLCJEYXNoYm9hcmQiLCJ1c2VDdXJyZW50QWRtaW4iLCJkYXRhIiwic2V0RGF0YSIsInNldFVzZXJzIiwic2V0Q2xpZW50c1MxIiwic2V0RW1wbG95ZWVzIiwic2V0RXhwZW5zZSIsInNldEluY29tZSIsImFwaSIsIkFwaUNsaWVudCIsImdldERhc2hib2FyZCIsInRoZW4iLCJyZXNwb25zZSIsInVzZXJzIiwiY2xpZW50cyIsImVtcGxveWVlcyIsImV4cGVuc2UiLCJpbmNvbWUiLCJlcnJvciIsInVzZVRyYW5zbGF0aW9uIiwidHJhbnNsYXRlTWVzc2FnZSIsInRyYW5zbGF0ZUJ1dHRvbiIsInZpc2liaWxpdHkiLCJhbmltYXRpb25OYW1lIiwiZm9udFNpemUiLCJwb3NpdGlvbiIsInBhZGRpbmdUb3AiLCJmb250RmFtaWx5IiwibWFyZ2luVG9wIiwiYW5pbWF0aW9uRHVyYXRpb24iLCJFeHBlbnNlVG90YWwiLCJzdW0iLCJwYXJzZUludCIsIk1lZGljYWxfZXhwZW5zZXMiLCJQYWtpc3Rhbl9PZmZpY2VfZXhwIiwiUGFraXN0YW5fU2FsIiwiUGFraXN0YW5fR292X2ZlZSIsIlBha2lzdGFuX0NvbWlzc2lvbiIsIk90aGVyc19QYWtpc3Rhbl9leHAiLCJNYWxheXNpYV9PZmZpY2VfZXhwIiwiTWFsYXlzaWFfc2FsIiwiTWFsYXlzaWFfR292X2ZlZSIsIk1hbGF5c2lhX0NvbWlzc2lvbiIsIk90aGVyc19NYWxheXNpYV9leHAiLCJJbmNvbWVUb3RhbCIsIkNsaWVudF9pbmNvbWUiLCJBZ2VudF9vcl9BZ2VuY3lfaW5jb21lIiwiRW1wbG95ZXJfaW5jb21lIiwib3RoZXJfSW5jb21lcyIsIkNsaWVudEluY29tZVRvdGFsIiwicG9wdWxhdGVkIiwidXJsIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwibGFzdFBhcnQiLCJzcGxpdCIsInBvcCIsImNsaWVudHNpbmNvbWV0b3RhbCIsIkdlbmVyYXRlUGRmIiwicmVzb3VyY2UiLCJyZWNvcmRBY3Rpb24iLCJyZWNvcmRJZCIsImlkIiwicmVzb3VyY2VJZCIsImFjdGlvbk5hbWUiLCJlcnIiLCJMb2FkZXIiLCJCdWxrR2VuZXJhdGVQZGYiLCJyZWNvcmRzIiwicmVjb3JkSWRzIiwiYnVsa0FjdGlvbiIsIlBheW1lbnRwYXlhYmxlIiwiVG90YWxfcGF5bWVudCIsIlBheW1lbnRfcGFpZCIsIkFkbWluSlMiLCJVc2VyQ29tcG9uZW50cyIsIkNvbXBvbmVudDAiLCJDb21wb25lbnQxIiwiQ29tcG9uZW50MiIsIkNvbXBvbmVudDMiLCJDb21wb25lbnQ0IiwiQ29tcG9uZW50NSIsIlBkZiIsIkJ1bGtQZGZHZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
