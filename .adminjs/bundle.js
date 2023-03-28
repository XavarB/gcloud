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
  AdminJS.UserComponents.Component6 = Edit;
  AdminJS.UserComponents.Component7 = List;
  AdminJS.UserComponents.Component8 = Show;
  AdminJS.UserComponents.Component9 = Edit;
  AdminJS.UserComponents.Component10 = List;
  AdminJS.UserComponents.Component11 = Show;
  AdminJS.UserComponents.Dashboard = Dashboard;
  AdminJS.UserComponents.ExpenseTotal = ExpenseTotal;
  AdminJS.UserComponents.IncomeTotal = IncomeTotal;
  AdminJS.UserComponents.ClientIncomeTotal = ClientIncomeTotal;
  AdminJS.UserComponents.Pdf = GeneratePdf;
  AdminJS.UserComponents.BulkPdfGen = BulkGeneratePdf;
  AdminJS.UserComponents.Paymentpayable = Paymentpayable;

})(React, AdminJS, AdminJSDesignSystem);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL2VkaXQudHN4IiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvdHlwZXMvbWltZS10eXBlcy50eXBlLnRzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9maWxlLnRzeCIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvbGlzdC50c3giLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL3Nob3cudHN4IiwiLi4vZGFzaGJvYXJkLmpzeCIsIi4uL2NvbXBvbmVudC9FeHBlbnNlVG90YWwuanN4IiwiLi4vY29tcG9uZW50L0luY29tZVRvdGFsLmpzeCIsIi4uL2NvbXBvbmVudC9DbGllbnRJbmNvbWVUb3RhbC5qc3giLCIuLi9jb21wb25lbnQvUERGR2VuZXJhdG9yLmpzeCIsIi4uL2NvbXBvbmVudC9CdWxrUERGZ2VuZXJhdG9yLmpzeCIsIi4uL2NvbXBvbmVudC9QYXltZW50cGF5YWJsZS5qc3giLCIuZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IEZDLCB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBFZGl0UHJvcGVydHlQcm9wcywgZmxhdCB9IGZyb20gJ2FkbWluanMnXG5pbXBvcnQgeyBEcm9wWm9uZSwgRm9ybUdyb3VwLCBMYWJlbCwgRHJvcFpvbmVJdGVtIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSdcbmltcG9ydCBQcm9wZXJ0eUN1c3RvbSBmcm9tICcuLi90eXBlcy9wcm9wZXJ0eS1jdXN0b20udHlwZSdcblxuY29uc3QgRWRpdDogRkM8RWRpdFByb3BlcnR5UHJvcHM+ID0gKHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UgfSkgPT4ge1xuICBjb25zdCB7IHBhcmFtcyB9ID0gcmVjb3JkXG4gIGNvbnN0IHsgY3VzdG9tIH0gPSBwcm9wZXJ0eSBhcyB1bmtub3duIGFzIHsgY3VzdG9tOiBQcm9wZXJ0eUN1c3RvbSB9XG5cbiAgY29uc3QgcGF0aCA9IGZsYXQuZ2V0KHBhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHkpXG4gIGNvbnN0IGtleSA9IGZsYXQuZ2V0KHBhcmFtcywgY3VzdG9tLmtleVByb3BlcnR5KVxuICBjb25zdCBmaWxlID0gZmxhdC5nZXQocGFyYW1zLCBjdXN0b20uZmlsZVByb3BlcnR5KVxuXG4gIGNvbnN0IFtvcmlnaW5hbEtleSwgc2V0T3JpZ2luYWxLZXldID0gdXNlU3RhdGUoa2V5KVxuICBjb25zdCBbZmlsZXNUb1VwbG9hZCwgc2V0RmlsZXNUb1VwbG9hZF0gPSB1c2VTdGF0ZTxBcnJheTxGaWxlPj4oW10pXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyBpdCBtZWFucyBtZWFucyB0aGF0IHNvbWVvbmUgaGl0IHNhdmUgYW5kIG5ldyBmaWxlIGhhcyBiZWVuIHVwbG9hZGVkXG4gICAgLy8gaW4gdGhpcyBjYXNlIGZsaWVzVG9VcGxvYWQgc2hvdWxkIGJlIGNsZWFyZWQuXG4gICAgLy8gVGhpcyBoYXBwZW5zIHdoZW4gdXNlciB0dXJucyBvZmYgcmVkaXJlY3QgYWZ0ZXIgbmV3L2VkaXRcbiAgICBpZiAoXG4gICAgICAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycgJiYga2V5ICE9PSBvcmlnaW5hbEtleSlcbiAgICAgIHx8ICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyAmJiAhb3JpZ2luYWxLZXkpXG4gICAgICB8fCAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgJiYgQXJyYXkuaXNBcnJheShrZXkpICYmIGtleS5sZW5ndGggIT09IG9yaWdpbmFsS2V5Lmxlbmd0aClcbiAgICApIHtcbiAgICAgIHNldE9yaWdpbmFsS2V5KGtleSlcbiAgICAgIHNldEZpbGVzVG9VcGxvYWQoW10pXG4gICAgfVxuICB9LCBba2V5LCBvcmlnaW5hbEtleV0pXG5cbiAgY29uc3Qgb25VcGxvYWQgPSAoZmlsZXM6IEFycmF5PEZpbGU+KTogdm9pZCA9PiB7XG4gICAgc2V0RmlsZXNUb1VwbG9hZChmaWxlcylcbiAgICBvbkNoYW5nZShjdXN0b20uZmlsZVByb3BlcnR5LCBmaWxlcylcbiAgfVxuXG4gIGNvbnN0IGhhbmRsZVJlbW92ZSA9ICgpID0+IHtcbiAgICBvbkNoYW5nZShjdXN0b20uZmlsZVByb3BlcnR5LCBudWxsKVxuICB9XG5cbiAgY29uc3QgaGFuZGxlTXVsdGlSZW1vdmUgPSAoc2luZ2xlS2V5KSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSAoZmxhdC5nZXQocmVjb3JkLnBhcmFtcywgY3VzdG9tLmtleVByb3BlcnR5KSB8fCBbXSkuaW5kZXhPZihzaW5nbGVLZXkpXG4gICAgY29uc3QgZmlsZXNUb0RlbGV0ZSA9IGZsYXQuZ2V0KHJlY29yZC5wYXJhbXMsIGN1c3RvbS5maWxlc1RvRGVsZXRlUHJvcGVydHkpIHx8IFtdXG4gICAgaWYgKFxuICAgICAgcGF0aCAmJiBwYXRoLmxlbmd0aCA+IDBcbiAgICApIHtcbiAgICAgIGNvbnN0IG5ld1BhdGggPSBwYXRoLm1hcCgoY3VycmVudFBhdGgsIGkpID0+IChpICE9PSBpbmRleCA/IGN1cnJlbnRQYXRoIDogbnVsbCkpXG4gICAgICBsZXQgbmV3UGFyYW1zID0gZmxhdC5zZXQoXG4gICAgICAgIHJlY29yZC5wYXJhbXMsXG4gICAgICAgIGN1c3RvbS5maWxlc1RvRGVsZXRlUHJvcGVydHksXG4gICAgICAgIFsuLi5maWxlc1RvRGVsZXRlLCBpbmRleF0sXG4gICAgICApXG4gICAgICBuZXdQYXJhbXMgPSBmbGF0LnNldChuZXdQYXJhbXMsIGN1c3RvbS5maWxlUGF0aFByb3BlcnR5LCBuZXdQYXRoKVxuXG4gICAgICBvbkNoYW5nZSh7XG4gICAgICAgIC4uLnJlY29yZCxcbiAgICAgICAgcGFyYW1zOiBuZXdQYXJhbXMsXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS5sb2coJ1lvdSBjYW5ub3QgcmVtb3ZlIGZpbGUgd2hlbiB0aGVyZSBhcmUgbm8gdXBsb2FkZWQgZmlsZXMgeWV0JylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxGb3JtR3JvdXA+XG4gICAgICA8TGFiZWw+e3Byb3BlcnR5LmxhYmVsfTwvTGFiZWw+XG4gICAgICA8RHJvcFpvbmVcbiAgICAgICAgb25DaGFuZ2U9e29uVXBsb2FkfVxuICAgICAgICBtdWx0aXBsZT17Y3VzdG9tLm11bHRpcGxlfVxuICAgICAgICB2YWxpZGF0ZT17e1xuICAgICAgICAgIG1pbWVUeXBlczogY3VzdG9tLm1pbWVUeXBlcyBhcyBBcnJheTxzdHJpbmc+LFxuICAgICAgICAgIG1heFNpemU6IGN1c3RvbS5tYXhTaXplLFxuICAgICAgICB9fVxuICAgICAgICBmaWxlcz17ZmlsZXNUb1VwbG9hZH1cbiAgICAgIC8+XG4gICAgICB7IWN1c3RvbS5tdWx0aXBsZSAmJiBrZXkgJiYgcGF0aCAmJiAhZmlsZXNUb1VwbG9hZC5sZW5ndGggJiYgZmlsZSAhPT0gbnVsbCAmJiAoXG4gICAgICAgIDxEcm9wWm9uZUl0ZW0gZmlsZW5hbWU9e2tleX0gc3JjPXtwYXRofSBvblJlbW92ZT17aGFuZGxlUmVtb3ZlfSAvPlxuICAgICAgKX1cbiAgICAgIHtjdXN0b20ubXVsdGlwbGUgJiYga2V5ICYmIGtleS5sZW5ndGggJiYgcGF0aCA/IChcbiAgICAgICAgPD5cbiAgICAgICAgICB7a2V5Lm1hcCgoc2luZ2xlS2V5LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgLy8gd2hlbiB3ZSByZW1vdmUgaXRlbXMgd2Ugc2V0IG9ubHkgcGF0aCBpbmRleCB0byBudWxscy5cbiAgICAgICAgICAgIC8vIGtleSBpcyBzdGlsbCB0aGVyZS4gVGhpcyBpcyBiZWNhdXNlXG4gICAgICAgICAgICAvLyB3ZSBoYXZlIHRvIG1haW50YWluIGFsbCB0aGUgaW5kZXhlcy4gU28gaGVyZSB3ZSBzaW1wbHkgZmlsdGVyIG91dCBlbGVtZW50cyB3aGljaFxuICAgICAgICAgICAgLy8gd2VyZSByZW1vdmVkIGFuZCBkaXNwbGF5IG9ubHkgd2hhdCB3YXMgbGVmdFxuICAgICAgICAgICAgY29uc3QgY3VycmVudFBhdGggPSBwYXRoW2luZGV4XVxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQYXRoID8gKFxuICAgICAgICAgICAgICA8RHJvcFpvbmVJdGVtXG4gICAgICAgICAgICAgICAga2V5PXtzaW5nbGVLZXl9XG4gICAgICAgICAgICAgICAgZmlsZW5hbWU9e3NpbmdsZUtleX1cbiAgICAgICAgICAgICAgICBzcmM9e3BhdGhbaW5kZXhdfVxuICAgICAgICAgICAgICAgIG9uUmVtb3ZlPXsoKSA9PiBoYW5kbGVNdWx0aVJlbW92ZShzaW5nbGVLZXkpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6ICcnXG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvPlxuICAgICAgKSA6ICcnfVxuICAgIDwvRm9ybUdyb3VwPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEVkaXRcbiIsImV4cG9ydCBjb25zdCBBdWRpb01pbWVUeXBlcyA9IFtcbiAgJ2F1ZGlvL2FhYycsXG4gICdhdWRpby9taWRpJyxcbiAgJ2F1ZGlvL3gtbWlkaScsXG4gICdhdWRpby9tcGVnJyxcbiAgJ2F1ZGlvL29nZycsXG4gICdhcHBsaWNhdGlvbi9vZ2cnLFxuICAnYXVkaW8vb3B1cycsXG4gICdhdWRpby93YXYnLFxuICAnYXVkaW8vd2VibScsXG4gICdhdWRpby8zZ3BwMicsXG5dIGFzIGNvbnN0XG5cbmV4cG9ydCBjb25zdCBWaWRlb01pbWVUeXBlcyA9IFtcbiAgJ3ZpZGVvL3gtbXN2aWRlbycsXG4gICd2aWRlby9tcGVnJyxcbiAgJ3ZpZGVvL29nZycsXG4gICd2aWRlby9tcDJ0JyxcbiAgJ3ZpZGVvL3dlYm0nLFxuICAndmlkZW8vM2dwcCcsXG4gICd2aWRlby8zZ3BwMicsXG5dIGFzIGNvbnN0XG5cbmV4cG9ydCBjb25zdCBJbWFnZU1pbWVUeXBlcyA9IFtcbiAgJ2ltYWdlL2JtcCcsXG4gICdpbWFnZS9naWYnLFxuICAnaW1hZ2UvanBlZycsXG4gICdpbWFnZS9wbmcnLFxuICAnaW1hZ2Uvc3ZnK3htbCcsXG4gICdpbWFnZS92bmQubWljcm9zb2Z0Lmljb24nLFxuICAnaW1hZ2UvdGlmZicsXG4gICdpbWFnZS93ZWJwJyxcbl0gYXMgY29uc3RcblxuZXhwb3J0IGNvbnN0IENvbXByZXNzZWRNaW1lVHlwZXMgPSBbXG4gICdhcHBsaWNhdGlvbi94LWJ6aXAnLFxuICAnYXBwbGljYXRpb24veC1iemlwMicsXG4gICdhcHBsaWNhdGlvbi9nemlwJyxcbiAgJ2FwcGxpY2F0aW9uL2phdmEtYXJjaGl2ZScsXG4gICdhcHBsaWNhdGlvbi94LXRhcicsXG4gICdhcHBsaWNhdGlvbi96aXAnLFxuICAnYXBwbGljYXRpb24veC03ei1jb21wcmVzc2VkJyxcbl0gYXMgY29uc3RcblxuZXhwb3J0IGNvbnN0IERvY3VtZW50TWltZVR5cGVzID0gW1xuICAnYXBwbGljYXRpb24veC1hYml3b3JkJyxcbiAgJ2FwcGxpY2F0aW9uL3gtZnJlZWFyYycsXG4gICdhcHBsaWNhdGlvbi92bmQuYW1hem9uLmVib29rJyxcbiAgJ2FwcGxpY2F0aW9uL21zd29yZCcsXG4gICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQud29yZHByb2Nlc3NpbmdtbC5kb2N1bWVudCcsXG4gICdhcHBsaWNhdGlvbi92bmQubXMtZm9udG9iamVjdCcsXG4gICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnByZXNlbnRhdGlvbicsXG4gICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnNwcmVhZHNoZWV0JyxcbiAgJ2FwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQudGV4dCcsXG4gICdhcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludCcsXG4gICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQucHJlc2VudGF0aW9ubWwucHJlc2VudGF0aW9uJyxcbiAgJ2FwcGxpY2F0aW9uL3ZuZC5yYXInLFxuICAnYXBwbGljYXRpb24vcnRmJyxcbiAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbCcsXG4gICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQuc3ByZWFkc2hlZXRtbC5zaGVldCcsXG5dIGFzIGNvbnN0XG5cbmV4cG9ydCBjb25zdCBUZXh0TWltZVR5cGVzID0gW1xuICAndGV4dC9jc3MnLFxuICAndGV4dC9jc3YnLFxuICAndGV4dC9odG1sJyxcbiAgJ3RleHQvY2FsZW5kYXInLFxuICAndGV4dC9qYXZhc2NyaXB0JyxcbiAgJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAnYXBwbGljYXRpb24vbGQranNvbicsXG4gICd0ZXh0L2phdmFzY3JpcHQnLFxuICAndGV4dC9wbGFpbicsXG4gICdhcHBsaWNhdGlvbi94aHRtbCt4bWwnLFxuICAnYXBwbGljYXRpb24veG1sJyxcbiAgJ3RleHQveG1sJyxcbl0gYXMgY29uc3RcblxuZXhwb3J0IGNvbnN0IEJpbmFyeURvY3NNaW1lVHlwZXMgPSBbXG4gICdhcHBsaWNhdGlvbi9lcHViK3ppcCcsXG4gICdhcHBsaWNhdGlvbi9wZGYnLFxuXSBhcyBjb25zdFxuXG5leHBvcnQgY29uc3QgRm9udE1pbWVUeXBlcyA9IFtcbiAgJ2ZvbnQvb3RmJyxcbiAgJ2ZvbnQvdHRmJyxcbiAgJ2ZvbnQvd29mZicsXG4gICdmb250L3dvZmYyJyxcbl0gYXMgY29uc3RcblxuZXhwb3J0IGNvbnN0IE90aGVyTWltZVR5cGVzID0gW1xuICAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyxcbiAgJ2FwcGxpY2F0aW9uL3gtY3NoJyxcbiAgJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5pbnN0YWxsZXIreG1sJyxcbiAgJ2FwcGxpY2F0aW9uL3gtaHR0cGQtcGhwJyxcbiAgJ2FwcGxpY2F0aW9uL3gtc2gnLFxuICAnYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnLFxuICAndm5kLnZpc2lvJyxcbiAgJ2FwcGxpY2F0aW9uL3ZuZC5tb3ppbGxhLnh1bCt4bWwnLFxuXSBhcyBjb25zdFxuXG5leHBvcnQgY29uc3QgTWltZVR5cGVzID0gW1xuICAuLi5BdWRpb01pbWVUeXBlcyxcbiAgLi4uVmlkZW9NaW1lVHlwZXMsXG4gIC4uLkltYWdlTWltZVR5cGVzLFxuICAuLi5Db21wcmVzc2VkTWltZVR5cGVzLFxuICAuLi5Eb2N1bWVudE1pbWVUeXBlcyxcbiAgLi4uVGV4dE1pbWVUeXBlcyxcbiAgLi4uQmluYXJ5RG9jc01pbWVUeXBlcyxcbiAgLi4uT3RoZXJNaW1lVHlwZXMsXG4gIC4uLkZvbnRNaW1lVHlwZXMsXG4gIC4uLk90aGVyTWltZVR5cGVzLFxuXVxuXG50eXBlIFBvcHVsYXJNaW1lVHlwZXMgPSB0eXBlb2YgTWltZVR5cGVzW251bWJlcl1cblxuZXhwb3J0IHR5cGUgTWltZVR5cGUgPSBQb3B1bGFyTWltZVR5cGVzIHwge1xuICBba2V5OiBzdHJpbmddOiBzdHJpbmdcbn1cbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXNcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBJY29uIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSdcbmltcG9ydCB7IGZsYXQsIFNob3dQcm9wZXJ0eVByb3BzIH0gZnJvbSAnYWRtaW5qcydcbmltcG9ydCBSZWFjdCwgeyBGQyB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgQXVkaW9NaW1lVHlwZXMsIEltYWdlTWltZVR5cGVzIH0gZnJvbSAnLi4vdHlwZXMvbWltZS10eXBlcy50eXBlJ1xuaW1wb3J0IFByb3BlcnR5Q3VzdG9tIGZyb20gJy4uL3R5cGVzL3Byb3BlcnR5LWN1c3RvbS50eXBlJ1xuXG50eXBlIFByb3BzID0gU2hvd1Byb3BlcnR5UHJvcHMgJiB7XG4gIHdpZHRoPzogbnVtYmVyIHwgc3RyaW5nO1xufTtcblxudHlwZSBTaW5nbGVGaWxlUHJvcHMgPSB7XG4gIG5hbWU6IHN0cmluZztcbiAgcGF0aD86IHN0cmluZztcbiAgbWltZVR5cGU/OiBzdHJpbmc7XG4gIHdpZHRoPzogbnVtYmVyIHwgc3RyaW5nO1xufTtcblxuY29uc3QgU2luZ2xlRmlsZTogRkM8U2luZ2xlRmlsZVByb3BzPiA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IG5hbWUsIHBhdGgsIG1pbWVUeXBlLCB3aWR0aCB9ID0gcHJvcHNcblxuICBpZiAocGF0aCAmJiBwYXRoLmxlbmd0aCkge1xuICAgIGlmIChtaW1lVHlwZSAmJiBJbWFnZU1pbWVUeXBlcy5pbmNsdWRlcyhtaW1lVHlwZSBhcyBhbnkpKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8aW1nXG4gICAgICAgICAgc3JjPXtwYXRofVxuICAgICAgICAgIHN0eWxlPXt7IG1heEhlaWdodDogd2lkdGgsIG1heFdpZHRoOiB3aWR0aCB9fVxuICAgICAgICAgIGFsdD17bmFtZX1cbiAgICAgICAgLz5cbiAgICAgIClcbiAgICB9XG4gICAgaWYgKG1pbWVUeXBlICYmIEF1ZGlvTWltZVR5cGVzLmluY2x1ZGVzKG1pbWVUeXBlIGFzIGFueSkpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxhdWRpbyBjb250cm9scyBzcmM9e3BhdGh9PlxuICAgICAgICAgIFlvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZVxuICAgICAgICAgIDxjb2RlPmF1ZGlvPC9jb2RlPlxuICAgICAgICAgIDx0cmFjayBraW5kPVwiY2FwdGlvbnNcIiAvPlxuICAgICAgICA8L2F1ZGlvPlxuICAgICAgKVxuICAgIH1cbiAgfVxuICByZXR1cm4gKFxuICAgIDxCb3g+XG4gICAgICA8QnV0dG9uIGFzPVwiYVwiIGhyZWY9e3BhdGh9IG1sPVwiZGVmYXVsdFwiIHNpemU9XCJzbVwiIHJvdW5kZWQgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgIDxJY29uIGljb249XCJEb2N1bWVudERvd25sb2FkXCIgY29sb3I9XCJ3aGl0ZVwiIG1yPVwiZGVmYXVsdFwiIC8+XG4gICAgICAgIHtuYW1lfVxuICAgICAgPC9CdXR0b24+XG4gICAgPC9Cb3g+XG4gIClcbn1cblxuY29uc3QgRmlsZTogRkM8UHJvcHM+ID0gKHsgd2lkdGgsIHJlY29yZCwgcHJvcGVydHkgfSkgPT4ge1xuICBjb25zdCB7IGN1c3RvbSB9ID0gcHJvcGVydHkgYXMgdW5rbm93biBhcyB7IGN1c3RvbTogUHJvcGVydHlDdXN0b20gfVxuXG4gIGxldCBwYXRoID0gZmxhdC5nZXQocmVjb3JkPy5wYXJhbXMsIGN1c3RvbS5maWxlUGF0aFByb3BlcnR5KVxuXG4gIGlmICghcGF0aCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBjb25zdCBuYW1lID0gZmxhdC5nZXQoXG4gICAgcmVjb3JkPy5wYXJhbXMsXG4gICAgY3VzdG9tLmZpbGVOYW1lUHJvcGVydHkgPyBjdXN0b20uZmlsZU5hbWVQcm9wZXJ0eSA6IGN1c3RvbS5rZXlQcm9wZXJ0eSxcbiAgKVxuXG4gIGNvbnN0IG1pbWVUeXBlID0gY3VzdG9tLm1pbWVUeXBlUHJvcGVydHlcbiAgICAmJiBmbGF0LmdldChyZWNvcmQ/LnBhcmFtcywgY3VzdG9tLm1pbWVUeXBlUHJvcGVydHkpXG5cbiAgaWYgKCFwcm9wZXJ0eS5jdXN0b20ubXVsdGlwbGUpIHtcbiAgICBpZiAoY3VzdG9tLm9wdHMgJiYgY3VzdG9tLm9wdHMuYmFzZVVybCkge1xuICAgICAgcGF0aCA9IGAke2N1c3RvbS5vcHRzLmJhc2VVcmx9LyR7bmFtZX1gXG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8U2luZ2xlRmlsZSBwYXRoPXtwYXRofSBuYW1lPXtuYW1lfSB3aWR0aD17d2lkdGh9IG1pbWVUeXBlPXttaW1lVHlwZX0gLz5cbiAgICApXG4gIH1cbiAgaWYgKGN1c3RvbS5vcHRzICYmIGN1c3RvbS5vcHRzLmJhc2VVcmwpIHtcbiAgICBjb25zdCBiYXNlVXJsID0gY3VzdG9tLm9wdHMuYmFzZVVybCB8fCAnJ1xuICAgIHBhdGggPSBwYXRoLm1hcCgoc2luZ2xlUGF0aCwgaW5kZXgpID0+IGAke2Jhc2VVcmx9LyR7bmFtZVtpbmRleF19YClcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtwYXRoLm1hcCgoc2luZ2xlUGF0aCwgaW5kZXgpID0+IChcbiAgICAgICAgPFNpbmdsZUZpbGVcbiAgICAgICAgICBrZXk9e3NpbmdsZVBhdGh9XG4gICAgICAgICAgcGF0aD17c2luZ2xlUGF0aH1cbiAgICAgICAgICBuYW1lPXtuYW1lW2luZGV4XX1cbiAgICAgICAgICB3aWR0aD17d2lkdGh9XG4gICAgICAgICAgbWltZVR5cGU9e21pbWVUeXBlW2luZGV4XX1cbiAgICAgICAgLz5cbiAgICAgICkpfVxuICAgIDwvPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEZpbGVcbiIsImltcG9ydCBSZWFjdCwgeyBGQyB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgU2hvd1Byb3BlcnR5UHJvcHMgfSBmcm9tICdhZG1pbmpzJ1xuXG5pbXBvcnQgRmlsZSBmcm9tICcuL2ZpbGUnXG5cbmNvbnN0IExpc3Q6IEZDPFNob3dQcm9wZXJ0eVByb3BzPiA9IChwcm9wcykgPT4gKDxGaWxlIHdpZHRoPXsxMDB9IHsuLi5wcm9wc30gLz4pXG5cbmV4cG9ydCBkZWZhdWx0IExpc3RcbiIsImltcG9ydCBSZWFjdCwgeyBGQyB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgU2hvd1Byb3BlcnR5UHJvcHMgfSBmcm9tICdhZG1pbmpzJ1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBMYWJlbCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nXG5cbmltcG9ydCBGaWxlIGZyb20gJy4vZmlsZSdcblxuY29uc3QgU2hvdzogRkM8U2hvd1Byb3BlcnR5UHJvcHM+ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgcHJvcGVydHkgfSA9IHByb3BzXG5cbiAgcmV0dXJuIChcbiAgICA8Rm9ybUdyb3VwPlxuICAgICAgPExhYmVsPntwcm9wZXJ0eS5sYWJlbH08L0xhYmVsPlxuICAgICAgPEZpbGUgd2lkdGg9XCIxMDAlXCIgey4uLnByb3BzfSAvPlxuICAgIDwvRm9ybUdyb3VwPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBBcGlDbGllbnQsdXNlQ3VycmVudEFkbWluIH0gZnJvbSAnYWRtaW5qcydcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnXG5pbXBvcnQge1xuICBCb3gsXG4gIEgyLFxuICBINSxcbiAgSDQsXG4gIFRleHQsXG4gIElsbHVzdHJhdGlvbixcbiAgSWxsdXN0cmF0aW9uUHJvcHMsXG4gIEJ1dHRvbixcbn0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSdcbmltcG9ydCB7IHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAnYWRtaW5qcydcblxuXG5cbmV4cG9ydCAgZnVuY3Rpb24gRGFzaGJvYXJkKCkgIHtcbiAgY29uc3QgW2N1cnJlbnRBZG1pbl0gPSB1c2VDdXJyZW50QWRtaW4oKTtcbiAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGUobnVsbClcbiAgY29uc3QgW3VzZXJzLHNldFVzZXJzXSA9IHVzZVN0YXRlKFtdKVxuICBjb25zdCBbY2xpZW50c1MxLHNldENsaWVudHNTMV0gPSB1c2VTdGF0ZShbXSlcbiAgY29uc3QgW2VtcGxveWVlcyxzZXRFbXBsb3llZXNdID0gdXNlU3RhdGUoW10pXG4gIGNvbnN0IFtleHBlbnNlLHNldEV4cGVuc2VdID0gdXNlU3RhdGUoW10pXG4gIGNvbnN0IFtpbmNvbWUsc2V0SW5jb21lXSA9IHVzZVN0YXRlKFtdKVxuICBjb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KClcbiAgXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgYXBpLmdldERhc2hib2FyZCgpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgc2V0RGF0YShyZXNwb25zZS5kYXRhKSAvLyB7IG1lc3NhZ2U6ICdIZWxsbyBXb3JsZCcgfVxuICAgICAgICBzZXRVc2VycyhyZXNwb25zZS5kYXRhLnVzZXJzKVxuICAgICAgICBzZXRDbGllbnRzUzEocmVzcG9uc2UuZGF0YS5jbGllbnRzKVxuICAgICAgICBzZXRFbXBsb3llZXMocmVzcG9uc2UuZGF0YS5lbXBsb3llZXMpXG4gICAgICAgIHNldEV4cGVuc2UocmVzcG9uc2UuZGF0YS5leHBlbnNlKVxuICAgICAgICBzZXRJbmNvbWUocmVzcG9uc2UuZGF0YS5pbmNvbWUpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgLy8gaGFuZGxlIGFueSBlcnJvcnNcbiAgICAgIH0pO1xuICB9LCBbXSlcbiAgY29uc3QgeyB0cmFuc2xhdGVNZXNzYWdlLCB0cmFuc2xhdGVCdXR0b24gfSA9IHVzZVRyYW5zbGF0aW9uKClcblxuICAvLyAgIGNvbnN0IHVzZXJNYXJrdXAgPSB1c2Vycy5tYXAoKHVzZXIpPT57XG4gIC8vICAgICAvLyBjb25zdCBjbGllbnRTMU1hcmt1cCA9IGNsaWVudHNTMS5tYXAoKGNsaWVudFMxKT0+e1xuICAvLyAgICAgcmV0dXJuKFxuICAvLyAgICAgICA8dHI+XG4gIC8vICAgICAgIDx0ZD57dXNlci5lbWFpbH08L3RkPlxuICAvLyAgICAgICA8dGQ+e3VzZXIucm9sZX08L3RkPlxuICAvLyAgICAgPC90cj5cbiAgLy8gICApXG4gICAgICBcbiAgLy8gfSlcblxuICAvLyBjb25zdCBjbGllbnRNYXJrdXAgPSBjbGllbnRzUzEubWFwKChjbGllbnQpPT57XG4gIC8vICAgcmV0dXJuKFxuICAvLyAgICAgPHRyPntjbGllbnQubmFtZX08L3RyPlxuICAvLyAgIClcbiAgLy8gfSlcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAge1xuICAgICAgZGF0YSAhPT0gbnVsbCAmJiBcbiAgICAgIDxkaXY+XG4gICAgICAgIHsvKiA8c3R5bGU+XG4gICAgICAgIHtcImJvZHlcIjp7XCJmb250U2l6ZVwiOlwiMThweFwiLFwiZm9udFdlaWdodFwiOlwiNDAwXCJ9LFwicF95XzJcIjp7XCJwYWRkaW5nVG9wXCI6XCIyOHB4XCIsXCJwYWRkaW5nQm90dG9tXCI6XCIyOHB4XCJ9LFwicF95XzNcIjp7XCJwYWRkaW5nVG9wXCI6XCI0NXB4XCIsXCJwYWRkaW5nQm90dG9tXCI6XCI0NXB4XCJ9LFwibV9iXzFcIjp7XCJtYXJnaW5Cb3R0b21cIjpcIjE4cHhcIn0sXCJtX3RfMVwiOntcIm1hcmdpblRvcFwiOlwiMThweFwifSxcIm1haW5fY291bnRlcl9hcmVhXCI6e1wiYmFja2dyb3VuZFNpemVcIjpcImNvdmVyXCIsXCJvdmVyZmxvd1wiOlwiaGlkZGVuXCJ9LFwibWFpbl9jb3VudGVyX2FyZWFfX21haW5fY291bnRlcl9jb250ZW50X19zaW5nbGVfY291bnRlclwiOntcImJhY2tncm91bmRcIjpcIiMwMDAwMDBcIixcImNvbG9yXCI6XCIjZmZmXCJ9LFwibWFpbl9jb3VudGVyX2FyZWFfX21haW5fY291bnRlcl9jb250ZW50X19zaW5nbGVfY291bnRlcl9pXCI6e1wiZm9udFNpemVcIjpcIjM2cHhcIn19XG4gICAgICAgIDwvc3R5bGU+ICovfVxuICAgICAgey8qIDk4Nzk5OCAqL31cbiAgICAgXG4gICAgIHsvKiA8dGFibGU+XG4gICAgICA8dGJvZHk+XG4gICAgICAgIHtjbGllbnRNYXJrdXB9XG4gICAgICA8L3Rib2R5PlxuICAgICA8L3RhYmxlPlxuICAgICAgKi99XG4gICAgICAgIHsvKiA8c2VjdGlvbiBpZD1cImNvdW50ZXJcIiBjbGFzc05hbWU9XCJjb3VudGVyXCI+XG4gICAgICAgICBcbiAgPGRpdiBjbGFzc05hbWU9XCJtYWluX2NvdW50ZXJfYXJlYVwiPlxuICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmxheSBwLXktM1wiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFpbl9jb3VudGVyX2NvbnRlbnQgIHRleHQtY2VudGVyIHdoaXRlLXRleHQgd293IGZhZGVJblVwXCIgc3R5bGU9e3tkaXNwbGF5OicnfX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZCBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaW5nbGVfY291bnRlciBwLXktMiBtLXQtMVwiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtYnJpZWZjYXNlIG0tYi0xXCIgLz5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi91c2Vycy5wbmdcIiBhbHQ9XCJ1c2Vyc1wiIC8+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInN0YXRpc3RpYy1jb3VudGVyXCI+eyhkYXRhLnVzZXJzLmxlbmd0aCl9PC9oMj5cbiAgICAgICAgICAgICAgICA8c3BhbiAvPlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8cD5Vc2VyczwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2luZ2xlX2NvdW50ZXIgcC15LTIgbS10LTFcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1jaGVjayBtLWItMVwiIC8+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInN0YXRpc3RpYy1jb3VudGVyXCI+eyhkYXRhLmNsaWVudHMubGVuZ3RoKX08L2gyPlxuICAgICAgICAgICAgICAgIDxwPkNsaWVudHM8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNpbmdsZV9jb3VudGVyIHAteS0yIG0tdC0xXCI+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY29mZmVlIG0tYi0xXCIgLz5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwic3RhdGlzdGljLWNvdW50ZXJcIj57KGRhdGEuZW1wbG95ZWVzLmxlbmd0aCl9PC9oMj5cbiAgICAgICAgICAgICAgICA8cD5FbXBsb3llZXMgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaW5nbGVfY291bnRlciBwLXktMiBtLXQtMVwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWJlZXIgbS1iLTFcIiAvPlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJzdGF0aXN0aWMtY291bnRlclwiPnsoZGF0YS5leHBlbnNlLmxlbmd0aCl9PC9oMj5cbiAgICAgICAgICAgICAgICA8cD5FeHBlbnNlPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaW5nbGVfY291bnRlciBwLXktMiBtLXQtMVwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWJlZXIgbS1iLTFcIiAvPlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJzdGF0aXN0aWMtY291bnRlclwiPnsoZGF0YS5pbmNvbWUubGVuZ3RoKX08L2gyPlxuICAgICAgICAgICAgICAgIDxwPkluY29tZTwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3NlY3Rpb24+ICovfVxuICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3b3cgZmFkZUluIGFuaW1hdGVkXCIgc3R5bGU9e3t2aXNpYmlsaXR5OiAndmlzaWJsZScsIGFuaW1hdGlvbk5hbWU6ICdmYWRlSW4nfX0+XG4gICAgXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIiA+XG4gICAgICAgICAgPGgxIHN0eWxlPXt7Zm9udFNpemU6JzEwMHB4JywgcG9zaXRpb246J2Fic29sdXRlJyxwYWRkaW5nVG9wOjgwLCBmb250RmFtaWx5OidzZXJpZid9fT5GYXJpc2h0YSBFbnRlcnByaXNlPC9oMT5cbiAgICAgICAgICAgICA8aW1nIHNyYz1cIi9iZzQuanBlZ1wiIGFsdD1cImpqZGhcIiBzdHlsZT17e21hcmdpblRvcDowLCBwYWRkaW5nVG9wOjAscG9zaXRpb246J3JlbGl0aXZlJ319Lz5cbiAgICAgICAgICAgIHsvKiBjb3VudGVyICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMyBjb2wtc20tNiBib3R0b20tbWFyZ2luIHRleHQtY2VudGVyIGNvdW50ZXItc2VjdGlvbiB3b3cgZmFkZUluVXAgc20tbWFyZ2luLWJvdHRvbS10ZW4gYW5pbWF0ZWRcIiBkYXRhLXdvdy1kdXJhdGlvbj1cIjMwMG1zXCIgc3R5bGU9e3t2aXNpYmlsaXR5OiAndmlzaWJsZScsIGFuaW1hdGlvbkR1cmF0aW9uOiAnMzAwbXMnLCBhbmltYXRpb25OYW1lOiAnZmFkZUluVXAnfX0+XG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiL3VzZXJzLnBuZ1wiIGFsdD1cInVzZXJzXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4gaWQ9XCJhbmltLW51bWJlci1waXp6YVwiIGNsYXNzTmFtZT1cImNvdW50ZXItbnVtYmVyXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGltZXIgY291bnRlciBhbHQtZm9udCBhcHBlYXJcIiBkYXRhLXRvPXs5ODB9IGRhdGEtc3BlZWQ9ezcwMDB9PnsoZGF0YS51c2Vycy5sZW5ndGgpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiY291bnRlci10aXRsZVwiPlRvdGFsIGFjdGl2ZSBVc2VyczwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgey8qIGVuZCBjb3VudGVyICovfVxuICAgICAgICAgICAgey8qIGNvdW50ZXIgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0zIGNvbC1zbS02IGJvdHRvbS1tYXJnaW4gdGV4dC1jZW50ZXIgY291bnRlci1zZWN0aW9uIHdvdyBmYWRlSW5VcCBzbS1tYXJnaW4tYm90dG9tLXRlbiBhbmltYXRlZFwiIGRhdGEtd293LWR1cmF0aW9uPVwiNjAwbXNcIiBzdHlsZT17e3Zpc2liaWxpdHk6ICd2aXNpYmxlJywgYW5pbWF0aW9uRHVyYXRpb246ICc2MDBtcycsIGFuaW1hdGlvbk5hbWU6ICdmYWRlSW5VcCd9fT5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9jbGllbnRzLnBuZ1wiIGFsdD1cImNsaWVudHNcIiAvPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0aW1lciBjb3VudGVyIGFsdC1mb250IGFwcGVhclwiIGRhdGEtdG89ezk4MH0gZGF0YS1zcGVlZD17NzAwMH0+eyhkYXRhLmNsaWVudHMubGVuZ3RoKX08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNvdW50ZXItdGl0bGVcIj5Ub3RhbCBDbGllbnRzPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7LyogZW5kIGNvdW50ZXIgKi99XG4gICAgICAgICAgICB7LyogY291bnRlciAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTMgY29sLXNtLTYgYm90dG9tLW1hcmdpbi1zbWFsbCB0ZXh0LWNlbnRlciBjb3VudGVyLXNlY3Rpb24gd293IGZhZGVJblVwIHhzLW1hcmdpbi1ib3R0b20tdGVuIGFuaW1hdGVkXCIgZGF0YS13b3ctZHVyYXRpb249XCI5MDBtc1wiIHN0eWxlPXt7dmlzaWJpbGl0eTogJ3Zpc2libGUnLCBhbmltYXRpb25EdXJhdGlvbjogJzkwMG1zJywgYW5pbWF0aW9uTmFtZTogJ2ZhZGVJblVwJ319PlxuICAgICAgICAgICAgPGltZyBzcmM9XCIvZW1wbG95ZWUucG5nXCIgYWx0PVwiZW1wbG95ZWVcIiAvPlxuICAgICAgICAgXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRpbWVyIGNvdW50ZXIgYWx0LWZvbnQgYXBwZWFyXCIgZGF0YS10bz17ODEwfSBkYXRhLXNwZWVkPXs3MDAwfT57KGRhdGEuZW1wbG95ZWVzLmxlbmd0aCl9PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjb3VudGVyLXRpdGxlXCI+TnVtYmVyIG9mIHdvcmtpbmcgRW1wbG95ZWVzPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7LyogZW5kIGNvdW50ZXIgKi99XG4gICAgICAgICAgICB7LyogY291bnRlciAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTMgY29sLXNtLTYgdGV4dC1jZW50ZXIgY291bnRlci1zZWN0aW9uIHdvdyBmYWRlSW5VcCBhbmltYXRlZFwiIGRhdGEtd293LWR1cmF0aW9uPVwiMTIwMG1zXCIgc3R5bGU9e3t2aXNpYmlsaXR5OiAndmlzaWJsZScsIGFuaW1hdGlvbkR1cmF0aW9uOiAnMTIwMG1zJywgYW5pbWF0aW9uTmFtZTogJ2ZhZGVJblVwJ319PlxuICAgICAgICAgICAgPGltZyBzcmM9XCIvZXhwZW5jZXMucG5nXCIgYWx0PVwiZXhwZW5jZXNcIiAvPlxuICAgICAgICAgICAgIFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0aW1lciBjb3VudGVyIGFsdC1mb250IGFwcGVhclwiIGRhdGEtdG89ezYwMH0gZGF0YS1zcGVlZD17NzAwMH0+eyhkYXRhLmV4cGVuc2UubGVuZ3RoKX08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNvdW50ZXItdGl0bGVcIj5DbGllbnRzIGV4cGVuc2UgZW50cmllczwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgey8qIGVuZCBjb3VudGVyICovfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgPC9kaXY+XG4gICAgfVxuICAgIDwvPlxuICAgIFxuICApXG59XG5cbiAgICBcbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZFxuXG5cblxuLy8gPGgxIHN0eWxlPXt7YmFja2dyb3VuZENvbG9yOicjZmZmZmYnfX0+eyhkYXRhLm1lc3NhZ2UpfTwvaDE+XG4vLyA8aDEgc3R5bGU9e3tiYWNrZ3JvdW5kQ29sb3I6JyNmZmZmZid9fT57KGRhdGEudXNlcnMubGVuZ3RoKX08L2gxPlxuLy8gPHRhYmxlIGNsYXNzTmFtZT0nY29udGFpbmVyIGJnLXByaW1hcnknPlxuLy8gICA8dGJvZHk+XG4vLyAgICAge3VzZXJNYXJrdXB9XG4gICAgXG4vLyAgIDwvdGJvZHk+XG4vLyA8L3RhYmxlPiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7cHJvcHN9IGZyb20gJ2FkbWluanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEV4cGVuc2VUb3RhbChwcm9wcykge1xuICAgIGNvbnN0IHtyZWNvcmQscHJvcGVydHl9ID0gcHJvcHNcbmNvbnN0IHtwYXJhbXN9ID0gcmVjb3JkXG4gICAgY29uc3Qgc3VtID0gcGFyc2VJbnQocGFyYW1zLk1lZGljYWxfZXhwZW5zZXMpICsgcGFyc2VJbnQocGFyYW1zLlBha2lzdGFuX09mZmljZV9leHApICsgcGFyc2VJbnQocGFyYW1zLlBha2lzdGFuX1NhbCkgKyBwYXJzZUludChwYXJhbXMuUGFraXN0YW5fR292X2ZlZSkgKyBwYXJzZUludChwYXJhbXMuUGFraXN0YW5fQ29taXNzaW9uKSArIHBhcnNlSW50KHBhcmFtcy5PdGhlcnNfUGFraXN0YW5fZXhwKSArIHBhcnNlSW50KHBhcmFtcy5NYWxheXNpYV9PZmZpY2VfZXhwKSArIHBhcnNlSW50KHBhcmFtcy5NYWxheXNpYV9zYWwpICsgcGFyc2VJbnQocGFyYW1zLk1hbGF5c2lhX0dvdl9mZWUpICsgcGFyc2VJbnQocGFyYW1zLk1hbGF5c2lhX0NvbWlzc2lvbiApKyBwYXJzZUludChwYXJhbXMuT3RoZXJzX01hbGF5c2lhX2V4cClcblxuICAgIGNvbnNvbGUubG9nKCdXb3JraW5nJyk7XG5cbiAgICBjb25zb2xlLmxvZyhwYXJhbXMpXG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiYm94X19Cb3gtc2MtMTdzYnEzcC0wIGJ1UHpaeCBhZG1pbmpzX0JveFwiPlxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwibGFiZWxfX0xhYmVsLXNjLW85MHM3ZC0wIGpxa3hiIGFkbWluanNfTGFiZWxcIj5FeHBlbnNlIFRvdGFsPC9sYWJlbD5cbiAgICAgICAge3N1bX1cbiAgICAgICAgPC9zZWN0aW9uPlxuICApXG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge3Byb3BzfSBmcm9tICdhZG1pbmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBJbmNvbWVUb3RhbChwcm9wcykge1xuICAgIGNvbnN0IHtyZWNvcmQscHJvcGVydHl9ID0gcHJvcHNcbmNvbnN0IHtwYXJhbXN9ID0gcmVjb3JkXG4gICAgY29uc3Qgc3VtID0gcGFyc2VJbnQoIHBhcmFtcy5DbGllbnRfaW5jb21lICkgKyBwYXJzZUludChwYXJhbXMuQWdlbnRfb3JfQWdlbmN5X2luY29tZSkgKyBwYXJzZUludChwYXJhbXMuRW1wbG95ZXJfaW5jb21lKSArIHBhcnNlSW50KHBhcmFtcy5vdGhlcl9JbmNvbWVzKSBcblxuICAgIGNvbnNvbGUubG9nKHBhcmFtcylcbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJib3hfX0JveC1zYy0xN3NicTNwLTAgYnVQelp4IGFkbWluanNfQm94XCI+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJsYWJlbF9fTGFiZWwtc2MtbzkwczdkLTAganFreGIgYWRtaW5qc19MYWJlbFwiPlRvdGFsIEluY29tZTwvbGFiZWw+XG4gICAgICAgIHtzdW19XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgKVxufVxuIiwiaW1wb3J0IFJlYWN0LHt1c2VTdGF0ZSx1c2VFZmZlY3R9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtwcm9wc30gZnJvbSAnYWRtaW5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2xpZW50SW5jb21lVG90YWwocHJvcHMpIHtcbiAgICBjb25zdCB7cmVjb3JkLHByb3BlcnR5fSA9IHByb3BzXG4gICAgY29uc29sZS5sb2cocmVjb3JkKTtcbmNvbnN0IHtwYXJhbXN9ID0gcmVjb3JkXG5jb25zdCBpbmNvbWUgPSByZWNvcmQucG9wdWxhdGVkLmluY29tZS5wYXJhbXNcbmNvbnNvbGUubG9nKGluY29tZSk7XG5cbmNvbnN0IHVybCA9d2luZG93LmxvY2F0aW9uLmhyZWZcbmNvbnN0IGxhc3RQYXJ0ID0gdXJsLnNwbGl0KFwiL1wiKS5wb3AoKTtcbmNvbnNvbGUubG9nKGxhc3RQYXJ0KVxuXG4gIFxuICAgIFxuICAgICAgY29uc3QgY2xpZW50c2luY29tZXRvdGFsID0gcGFyc2VJbnQoaW5jb21lLkNsaWVudF9pbmNvbWUpICsgcGFyc2VJbnQoaW5jb21lLkFnZW50X29yX0FnZW5jeV9pbmNvbWUgKSsgcGFyc2VJbnQoaW5jb21lLkVtcGxveWVyX2luY29tZSApKyBwYXJzZUludChpbmNvbWUub3RoZXJfSW5jb21lcylcblxuICAgICAgaWYgKGxhc3RQYXJ0PT09J3Nob3cnKXtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJib3hfX0JveC1zYy0xN3NicTNwLTAgYnVQelp4IGFkbWluanNfQm94XCI+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImxhYmVsX19MYWJlbC1zYy1vOTBzN2QtMCBqcWt4YiBhZG1pbmpzX0xhYmVsXCI+Q2xpZW50IEluY29tZSBUb3RhbDwvbGFiZWw+XG4gIFxuICAgICAgICAgIHtjbGllbnRzaW5jb21ldG90YWx9XG4gICAgICAgICAgPC9zZWN0aW9uPlxuICAgIClcbiAgICAgIH1lbHNlXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICB7Y2xpZW50c2luY29tZXRvdGFsfVxuICAgICAgICA8L2Rpdj5cbiAgKVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgQXBpQ2xpZW50LCBBY3Rpb25Qcm9wcyx1c2VDdXJyZW50QWRtaW4gfSBmcm9tICdhZG1pbmpzJ1xuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSdcblxuY29uc3QgR2VuZXJhdGVQZGYgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgW2N1cnJlbnRBZG1pbl0gPSB1c2VDdXJyZW50QWRtaW4oKTtcbiAgY29uc3QgeyByZWNvcmQsIHJlc291cmNlIH0gPSBwcm9wc1xuICBjb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KClcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGFwaS5yZWNvcmRBY3Rpb24oe1xuICAgICAgcmVjb3JkSWQ6IHJlY29yZC5pZCxcbiAgICAgIHJlc291cmNlSWQ6IHJlc291cmNlLmlkLFxuICAgICAgYWN0aW9uTmFtZTogJ1BkZkdlbidcbiAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YS51cmwpXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlc3BvbnNlLmRhdGEudXJsXG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpXG4gICAgfSlcbiAgfSwgW10pXG5cbiAgcmV0dXJuIDxMb2FkZXIgLz5cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2VuZXJhdGVQZGYiLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBBcGlDbGllbnQsIEFjdGlvblByb3BzLHVzZUN1cnJlbnRBZG1pbiB9IGZyb20gJ2FkbWluanMnXG5pbXBvcnQgeyBMb2FkZXIgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJ1xuXG5jb25zdCBCdWxrR2VuZXJhdGVQZGYgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCBbY3VycmVudEFkbWluXSA9IHVzZUN1cnJlbnRBZG1pbigpO1xuICAgIGNvbnN0IHsgcmVjb3JkcywgcmVzb3VyY2UgfSA9IHByb3BzXG4gICAgY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpXG5cbiAgICBjb25zdCByZWNvcmRJZHMgPSByZWNvcmRzLm1hcChyZWNvcmQ9PntcbiAgICAgICAgcmV0dXJuIHJlY29yZC5pZFxuICAgIH0pXG5cbiAgICBjb25zb2xlLmxvZyhyZWNvcmRJZHMpXG4gICAgXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKCdoZXJlJylcbiAgICAgIGFwaS5idWxrQWN0aW9uKHtcbiAgICAgICAgcmVjb3JkSWRzOiByZWNvcmRJZHMsXG4gICAgICAgIHJlc291cmNlSWQ6ICdDbGllbnRzUzEnLFxuICAgICAgICBhY3Rpb25OYW1lOiAnYnVsa1BkZidcbiAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEudXJsKVxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlc3BvbnNlLmRhdGEudXJsXG4gICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgICAgICBjb25zb2xlLmxvZygnRXJyb3InKVxuICAgICAgfSlcbiAgICB9LCBbXSlcbiAgXG4gICAgcmV0dXJuIDxMb2FkZXIgLz5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQnVsa0dlbmVyYXRlUGRmIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtwcm9wc30gZnJvbSAnYWRtaW5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGF5bWVudHBheWFibGUocHJvcHMpIHtcbiAgICBjb25zdCB7cmVjb3JkLHByb3BlcnR5fSA9IHByb3BzXG5jb25zdCB7cGFyYW1zfSA9IHJlY29yZFxuICAgIGNvbnN0IHN1bSA9IHBhcnNlSW50KHBhcmFtcy5Ub3RhbF9wYXltZW50KSAtIHBhcnNlSW50KHBhcmFtcy5QYXltZW50X3BhaWQpIFxuXG4gICBcbiAgICBcblxuICAgIGNvbnNvbGUubG9nKHBhcmFtcylcbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJib3hfX0JveC1zYy0xN3NicTNwLTAgYnVQelp4IGFkbWluanNfQm94XCI+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJsYWJlbF9fTGFiZWwtc2MtbzkwczdkLTAganFreGIgYWRtaW5qc19MYWJlbFwiPlBheW1lbnRwYXlhYmxlPC9sYWJlbD5cbiAgICAgICAge3N1bX1cbiAgICAgICAgPC9zZWN0aW9uPlxuICApXG59XG4iLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBDb21wb25lbnQwIGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvZWRpdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50MCA9IENvbXBvbmVudDBcbmltcG9ydCBDb21wb25lbnQxIGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvbGlzdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50MSA9IENvbXBvbmVudDFcbmltcG9ydCBDb21wb25lbnQyIGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvc2hvdydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50MiA9IENvbXBvbmVudDJcbmltcG9ydCBDb21wb25lbnQzIGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvZWRpdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50MyA9IENvbXBvbmVudDNcbmltcG9ydCBDb21wb25lbnQ0IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvbGlzdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50NCA9IENvbXBvbmVudDRcbmltcG9ydCBDb21wb25lbnQ1IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvc2hvdydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50NSA9IENvbXBvbmVudDVcbmltcG9ydCBDb21wb25lbnQ2IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvZWRpdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50NiA9IENvbXBvbmVudDZcbmltcG9ydCBDb21wb25lbnQ3IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvbGlzdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50NyA9IENvbXBvbmVudDdcbmltcG9ydCBDb21wb25lbnQ4IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvc2hvdydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50OCA9IENvbXBvbmVudDhcbmltcG9ydCBDb21wb25lbnQ5IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvZWRpdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50OSA9IENvbXBvbmVudDlcbmltcG9ydCBDb21wb25lbnQxMCBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL2xpc3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbXBvbmVudDEwID0gQ29tcG9uZW50MTBcbmltcG9ydCBDb21wb25lbnQxMSBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL3Nob3cnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbXBvbmVudDExID0gQ29tcG9uZW50MTFcbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi4vZGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5EYXNoYm9hcmQgPSBEYXNoYm9hcmRcbmltcG9ydCBFeHBlbnNlVG90YWwgZnJvbSAnLi4vY29tcG9uZW50L0V4cGVuc2VUb3RhbCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuRXhwZW5zZVRvdGFsID0gRXhwZW5zZVRvdGFsXG5pbXBvcnQgSW5jb21lVG90YWwgZnJvbSAnLi4vY29tcG9uZW50L0luY29tZVRvdGFsJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5JbmNvbWVUb3RhbCA9IEluY29tZVRvdGFsXG5pbXBvcnQgQ2xpZW50SW5jb21lVG90YWwgZnJvbSAnLi4vY29tcG9uZW50L0NsaWVudEluY29tZVRvdGFsJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5DbGllbnRJbmNvbWVUb3RhbCA9IENsaWVudEluY29tZVRvdGFsXG5pbXBvcnQgUGRmIGZyb20gJy4uL2NvbXBvbmVudC9QREZHZW5lcmF0b3InXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlBkZiA9IFBkZlxuaW1wb3J0IEJ1bGtQZGZHZW4gZnJvbSAnLi4vY29tcG9uZW50L0J1bGtQREZnZW5lcmF0b3InXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkJ1bGtQZGZHZW4gPSBCdWxrUGRmR2VuXG5pbXBvcnQgUGF5bWVudHBheWFibGUgZnJvbSAnLi4vY29tcG9uZW50L1BheW1lbnRwYXlhYmxlJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5QYXltZW50cGF5YWJsZSA9IFBheW1lbnRwYXlhYmxlIl0sIm5hbWVzIjpbIkVkaXQiLCJwcm9wZXJ0eSIsInJlY29yZCIsIm9uQ2hhbmdlIiwicGFyYW1zIiwiY3VzdG9tIiwicGF0aCIsImZsYXQiLCJnZXQiLCJmaWxlUGF0aFByb3BlcnR5Iiwia2V5Iiwia2V5UHJvcGVydHkiLCJmaWxlIiwiZmlsZVByb3BlcnR5IiwidXNlU3RhdGUiLCJvcmlnaW5hbEtleSIsInNldE9yaWdpbmFsS2V5IiwiZmlsZXNUb1VwbG9hZCIsInNldEZpbGVzVG9VcGxvYWQiLCJ1c2VFZmZlY3QiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJvblVwbG9hZCIsImZpbGVzIiwiaGFuZGxlUmVtb3ZlIiwiaGFuZGxlTXVsdGlSZW1vdmUiLCJzaW5nbGVLZXkiLCJpbmRleCIsImluZGV4T2YiLCJmaWxlc1RvRGVsZXRlIiwiZmlsZXNUb0RlbGV0ZVByb3BlcnR5IiwibmV3UGF0aCIsIm1hcCIsImN1cnJlbnRQYXRoIiwiaSIsIm5ld1BhcmFtcyIsInNldCIsImNvbnNvbGUiLCJsb2ciLCJSZWFjdCIsIkZvcm1Hcm91cCIsIkxhYmVsIiwibGFiZWwiLCJEcm9wWm9uZSIsIm11bHRpcGxlIiwibWltZVR5cGVzIiwibWF4U2l6ZSIsIkRyb3Bab25lSXRlbSIsIkF1ZGlvTWltZVR5cGVzIiwiSW1hZ2VNaW1lVHlwZXMiLCJTaW5nbGVGaWxlIiwicHJvcHMiLCJuYW1lIiwibWltZVR5cGUiLCJ3aWR0aCIsImluY2x1ZGVzIiwibWF4SGVpZ2h0IiwibWF4V2lkdGgiLCJCb3giLCJCdXR0b24iLCJJY29uIiwiRmlsZSIsImZpbGVOYW1lUHJvcGVydHkiLCJtaW1lVHlwZVByb3BlcnR5Iiwib3B0cyIsImJhc2VVcmwiLCJzaW5nbGVQYXRoIiwiTGlzdCIsIlNob3ciLCJEYXNoYm9hcmQiLCJ1c2VDdXJyZW50QWRtaW4iLCJkYXRhIiwic2V0RGF0YSIsInNldFVzZXJzIiwic2V0Q2xpZW50c1MxIiwic2V0RW1wbG95ZWVzIiwic2V0RXhwZW5zZSIsInNldEluY29tZSIsImFwaSIsIkFwaUNsaWVudCIsImdldERhc2hib2FyZCIsInRoZW4iLCJyZXNwb25zZSIsInVzZXJzIiwiY2xpZW50cyIsImVtcGxveWVlcyIsImV4cGVuc2UiLCJpbmNvbWUiLCJlcnJvciIsInVzZVRyYW5zbGF0aW9uIiwidHJhbnNsYXRlTWVzc2FnZSIsInRyYW5zbGF0ZUJ1dHRvbiIsInZpc2liaWxpdHkiLCJhbmltYXRpb25OYW1lIiwiZm9udFNpemUiLCJwb3NpdGlvbiIsInBhZGRpbmdUb3AiLCJmb250RmFtaWx5IiwibWFyZ2luVG9wIiwiYW5pbWF0aW9uRHVyYXRpb24iLCJFeHBlbnNlVG90YWwiLCJzdW0iLCJwYXJzZUludCIsIk1lZGljYWxfZXhwZW5zZXMiLCJQYWtpc3Rhbl9PZmZpY2VfZXhwIiwiUGFraXN0YW5fU2FsIiwiUGFraXN0YW5fR292X2ZlZSIsIlBha2lzdGFuX0NvbWlzc2lvbiIsIk90aGVyc19QYWtpc3Rhbl9leHAiLCJNYWxheXNpYV9PZmZpY2VfZXhwIiwiTWFsYXlzaWFfc2FsIiwiTWFsYXlzaWFfR292X2ZlZSIsIk1hbGF5c2lhX0NvbWlzc2lvbiIsIk90aGVyc19NYWxheXNpYV9leHAiLCJJbmNvbWVUb3RhbCIsIkNsaWVudF9pbmNvbWUiLCJBZ2VudF9vcl9BZ2VuY3lfaW5jb21lIiwiRW1wbG95ZXJfaW5jb21lIiwib3RoZXJfSW5jb21lcyIsIkNsaWVudEluY29tZVRvdGFsIiwicG9wdWxhdGVkIiwidXJsIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwibGFzdFBhcnQiLCJzcGxpdCIsInBvcCIsImNsaWVudHNpbmNvbWV0b3RhbCIsIkdlbmVyYXRlUGRmIiwicmVzb3VyY2UiLCJyZWNvcmRBY3Rpb24iLCJyZWNvcmRJZCIsImlkIiwicmVzb3VyY2VJZCIsImFjdGlvbk5hbWUiLCJlcnIiLCJMb2FkZXIiLCJCdWxrR2VuZXJhdGVQZGYiLCJyZWNvcmRzIiwicmVjb3JkSWRzIiwiYnVsa0FjdGlvbiIsIlBheW1lbnRwYXlhYmxlIiwiVG90YWxfcGF5bWVudCIsIlBheW1lbnRfcGFpZCIsIkFkbWluSlMiLCJVc2VyQ29tcG9uZW50cyIsIkNvbXBvbmVudDAiLCJDb21wb25lbnQxIiwiQ29tcG9uZW50MiIsIkNvbXBvbmVudDMiLCJDb21wb25lbnQ0IiwiQ29tcG9uZW50NSIsIkNvbXBvbmVudDYiLCJDb21wb25lbnQ3IiwiQ29tcG9uZW50OCIsIkNvbXBvbmVudDkiLCJDb21wb25lbnQxMCIsIkNvbXBvbmVudDExIiwiUGRmIiwiQnVsa1Bk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
