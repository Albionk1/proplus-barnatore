var Tremol = Tremol || { };
Tremol.FP = Tremol.FP || function () { };
Tremol.FP.prototype.timeStamp = 2207281737;
/**
 * Provides information about device's GPRS signal.
 * @return {string}
 */
Tremol.FP.prototype.ReadGPRS_Signal = function () {
	return this.do('ReadGPRS_Signal');
};

/**
 * Prints an article report with or without zeroing ('Z' or 'X').
 * @param {Tremol.Enums.OptionZeroing} OptionZeroing with following values: 
 - 'Z' - Zeroing 
 - 'X' - Without zeroing
 */
Tremol.FP.prototype.PrintArticleReport = function (OptionZeroing) {
	return this.do('PrintArticleReport', 'OptionZeroing', OptionZeroing);
};

/**
 * Provides information about the current (the last value stored into the FM) decimal point format.
 * @return {Tremol.Enums.OptionDecimalPointPosition}
 */
Tremol.FP.prototype.ReadDecimalPoint = function () {
	return this.do('ReadDecimalPoint');
};

/**
 * Programs the number of POS, printing of logo, cash drawer opening, cutting permission, external display management mode, sending receipts, enable or disable currency in receipt and working operators counter.
 * @param {number} POSNum 4 symbols for number of POS in format ####
 * @param {Tremol.Enums.OptionPrintLogo} OptionPrintLogo 1 symbol of value: 
 - '1' - Yes 
 - '0' - No
 * @param {Tremol.Enums.OptionAutoOpenDrawer} OptionAutoOpenDrawer 1 symbol of value: 
 - '1' - Yes 
 - '0' - No
 * @param {Tremol.Enums.OptionAutoCut} OptionAutoCut 1 symbol of value: 
 - '1' - Yes 
 - '0' - No
 * @param {Tremol.Enums.OptionExternalDispManagement} OptionExternalDispManagement 1 symbol of value: 
 - '1' - Manual 
 - '0' - Auto
 * @param {Tremol.Enums.OptionWorkOperatorCount} OptionWorkOperatorCount 1 symbol of value: 
 - '1' - One 
 - '0' - More
 */
Tremol.FP.prototype.ProgParameters = function (POSNum, OptionPrintLogo, OptionAutoOpenDrawer, OptionAutoCut, OptionExternalDispManagement, OptionWorkOperatorCount) {
	return this.do('ProgParameters', 'POSNum', POSNum, 'OptionPrintLogo', OptionPrintLogo, 'OptionAutoOpenDrawer', OptionAutoOpenDrawer, 'OptionAutoCut', OptionAutoCut, 'OptionExternalDispManagement', OptionExternalDispManagement, 'OptionWorkOperatorCount', OptionWorkOperatorCount);
};

/**
 * @typedef {Object} DailySaleAmountsByVATRes
 * @property {string} SalesAmountVATGr0 Up to 11 symbols for the sales amount accumulated by VAT group A
 * @property {string} SalesAmountVATGr1 Up to 11 symbols for the sales amount accumulated by VAT group B
 * @property {string} SalesAmountVATGr2 Up to 11 symbols for the sales amount accumulated by VAT group C
 * @property {string} SalesAmountVATGr3 Up to 11 symbols for the sales amount accumulated by VAT group D
 * @property {string} SalesAmountVATGr4 Up to 11 symbols for the sales amount accumulated by VAT group E
 * @property {string} SalesAmountVATGr5 Up to 11 symbols for the sales amount accumulated by VAT group F
 * @property {string} SalesAmountVATGr6 Up to 11 symbols for the sales amount accumulated by VAT group G
 * @property {string} SalesAmountVATGr7 Up to 11 symbols for the sales amount accumulated by VAT group H
 */

/**
 * Provides information about the accumulated amount by VAT group.
 * @return {DailySaleAmountsByVATRes}
 */
Tremol.FP.prototype.ReadDailySaleAmountsByVAT = function () {
	return this.do('ReadDailySaleAmountsByVAT');
};

/**
 * Start LAN test on the device and print out the result
 */
Tremol.FP.prototype.StartTest_Lan = function () {
	return this.do('StartTest_Lan');
};

/**
 * @typedef {Object} DepartmentRes
 * @property {number} DepNum 2 symbols for department number in format ##
 * @property {string} DepName 34 symbols for department name
 * @property {Tremol.Enums.OptionVATClass} OptionVATClass 1 character for VAT class attachment of the department: 
 - 'A' - VAT Class A 
 - 'B' - VAT Class B 
 - 'C' - VAT Class C 
 - 'D' - VAT Class D 
 - 'E' - VAT Class E 
 - 'F' - VAT Class F 
 - 'G' - VAT Class G 
 - 'H' - VAT Class H
 * @property {number} Price 1..11 symbols for Department price
 * @property {string} FlagsPrice (Setting price, single transaction, type of goods) 1 symbol with value: 
Flags.7=1 
Flags.6=0 
Flags.5=0 
Flags.4=0 
Flags.3=1 Yes, Flags.3=0 No (Fractional quantity disabled) 
Flags.2=1 Yes, Flags.2=0 No (Single Transaction) 
Flags.1=1 Yes, Flags.1=0 No (Free price limited) 
Flags.0=1 Yes, Flags.0=0 No (Free price enabled)
 * @property {number} Turnover Up to 11 symbols for accumulated turnover of the department
 * @property {number} SoldQuantity Up to 11 symbols for sold quantity of the department
 * @property {number} RefundAmount Up to 11 symbols for accumulated refund amount of the department
 * @property {number} RefundQTY Up to 11 symbols for accumulated refund quantity of department
 * @property {number} LastZReportNumber Up to 5 symbols for the number of last Z report in format #####
 * @property {Date} LastZReportDate 16 symbols for the date and hour in last Z report
 */

/**
 * Provides information for the programmed data, the turnover from the stated department number
 * @param {number} DepNum 2 symbols for deparment number in format: ##
 * @return {DepartmentRes}
 */
Tremol.FP.prototype.ReadDepartment = function (DepNum) {
	return this.do('ReadDepartment', 'DepNum', DepNum);
};

/**
 * Provides information about the number of the last issued receipt.
 * @return {number}
 */
Tremol.FP.prototype.ReadLastReceiptNum = function () {
	return this.do('ReadLastReceiptNum');
};

/**
 * Programs the general data for a certain article in the internal FD database. The price may have variable length, while the name field is fixed.
 * @param {string} PLUNum 5 symbols for article number
 * @param {string} PLUName 32 symbols for article name
 * @param {number} Price 1 to 10 symbols for article price
 * @param {string} FlagsPriceQty 1 symbols with value: 
Flags.7=1 
Flags.6=0 
Flags.5=1 Yes, Flags.5=0 No (Fractional quantity disabled) 
Flags.4=1 Yes, Flags.4=0 No (Single Transaction) 
Flags.3=1 Yes, Flags.3=0 No (Allow negative quantity) 
Flags.2=1 Yes, Flags.2=0 No (Monitoring quantity in stock) 
Flags.1=1 Yes, Flags.1=0 No (Free price limited) 
Flags.0=1 Yes, Flags.0=0 No (Free price enabled)
 * @param {Tremol.Enums.OptionVATClass} OptionVATClass 1 character for article VAT Class: 
 - 'A' - VAT Class A 
 - 'B' - VAT Class B 
 - 'C' - VAT Class C 
 - 'D' - VAT Class D 
 - 'E' - VAT Class E 
 - 'F' - VAT Class F 
 - 'G' - VAT Class G 
 - 'H' - VAT Class H
 * @param {number} BelongToDepNum BelongToDepNum + 80h, 1 symbol for article 
department attachment, formed in the following manner: 
BelongToDepNum[HEX] + 80h example: Dep01 = 81h, Dep02 = 82h … 
Dep19 = 93h
 * @param {number} AvailableQuantity Up to 11 symbols for quantity in stock
 * @param {string} Barcode 13 symbols for barcode
 */
Tremol.FP.prototype.ProgPLUgeneral = function (PLUNum, PLUName, Price, FlagsPriceQty, OptionVATClass, BelongToDepNum, AvailableQuantity, Barcode) {
	return this.do('ProgPLUgeneral', 'PLUNum', PLUNum, 'PLUName', PLUName, 'Price', Price, 'FlagsPriceQty', FlagsPriceQty, 'OptionVATClass', OptionVATClass, 'BelongToDepNum', BelongToDepNum, 'AvailableQuantity', AvailableQuantity, 'Barcode', Barcode);
};

/**
 * Program the number of symbols per line.
 * @param {string} Password 6 symbols for password
 * @param {Tremol.Enums.OptionLineSymbols} OptionLineSymbols 1 symbol with value: 
 - '0' - Symbols per line 32 
 - '1' - Symbols per line 48
 */
Tremol.FP.prototype.ProgSymbolsPerLine = function (Password, OptionLineSymbols) {
	return this.do('ProgSymbolsPerLine', 'Password', Password, 'OptionLineSymbols', OptionLineSymbols);
};

/**
 * Print or store Electronic Journal report with all documents.
 */
Tremol.FP.prototype.PrintEJ = function () {
	return this.do('PrintEJ');
};

/**
 * Provides information about the communication module, used for talking with the server
 * @return {Tremol.Enums.OptionCommunicationModule}
 */
Tremol.FP.prototype.ReadUsedComModule = function () {
	return this.do('ReadUsedComModule');
};

/**
 * Restore previous header if current header is not saved into fiscal memory.
 */
Tremol.FP.prototype.RestorePreviousHeader = function () {
	return this.do('RestorePreviousHeader');
};

/**
 * Opens the cash drawer.
 */
Tremol.FP.prototype.CashDrawerOpen = function () {
	return this.do('CashDrawerOpen');
};

/**
 * Program device's TCP password. To apply use - 4Eh / N - Save network settings
 * @param {number} PassLength Up to 3 symbols for the password len
 * @param {string} Password Up to 100 symbols for the TCP password
 */
Tremol.FP.prototype.SetTCPpassword = function (PassLength, Password) {
	return this.do('SetTCPpassword', 'PassLength', PassLength, 'Password', Password);
};

/**
 * Shows a 20-symbols text in the first line and last 20-symbols text in the second line of the external display lines.
 * @param {string} Text 40 symbols text
 */
Tremol.FP.prototype.DisplayTextLines1and2 = function (Text) {
	return this.do('DisplayTextLines1and2', 'Text', Text);
};

/**
 * Register the sell with specified quantity of article from the internal FD database.
 * @param {Tremol.Enums.OptionSign} OptionSign 1 symbol with optional value: 
 - '+' -Sale 
 - '-' - Correction
 * @param {number} PLUNum 5 symbols for PLU number of FD's database in format #####
 * @param {number=} Price Up to 10 symbols for sale price
 * @param {number=} Quantity Up to 10 symbols for article's quantity sold
 * @param {number=} DiscAddP Up to 7 for percentage of discount/addition. Use minus 
sign '-' for discount
 * @param {number=} DiscAddV Up to 8 symbolsfor percentage of discount/addition. 
Use minus sign '-' for discount
 */
Tremol.FP.prototype.SellPLUFromFD_DB = function (OptionSign, PLUNum, Price, Quantity, DiscAddP, DiscAddV) {
	return this.do('SellPLUFromFD_DB', 'OptionSign', OptionSign, 'PLUNum', PLUNum, 'Price', Price, 'Quantity', Quantity, 'DiscAddP', DiscAddP, 'DiscAddV', DiscAddV);
};

/**
 * Read temporary header language
 * @return {Tremol.Enums.OptionLanguage}
 */
Tremol.FP.prototype.ReadTempLanguage = function () {
	return this.do('ReadTempLanguage');
};

/**
 * @typedef {Object} DailyReturnedRes
 * @property {number} AmountPayment Up to 11 symbols for amount received from sales change by cash
 * @property {number} AmountPaymentOthers Up to 11 symbols for amount received from sales change by 
others payment
 */

/**
 * Provides information about the amounts returned as sales change.
 * @return {DailyReturnedRes}
 */
Tremol.FP.prototype.ReadDailyReturned = function () {
	return this.do('ReadDailyReturned');
};

/**
 * Provides information about the current date and time.
 * @return {Date}
 */
Tremol.FP.prototype.ReadDateTime = function () {
	return this.do('ReadDateTime');
};

/**
 * Register the payment in the receipt with specified type of payment and exact amount received.
 * @param {Tremol.Enums.OptionPaymentType} OptionPaymentType 1 symbol with values  
 - '0' - Cash 
 - '1' - Card  
 - '2' - Voucher  
 - '3' - Credit 
 - '4' - Currency
 */
Tremol.FP.prototype.PayExactSum = function (OptionPaymentType) {
	return this.do('PayExactSum', 'OptionPaymentType', OptionPaymentType);
};

/**
 * Start WiFi test on the device and print out the result
 */
Tremol.FP.prototype.StartTest_WiFi = function () {
	return this.do('StartTest_WiFi');
};

/**
 * Provides information about TCP device MAC address
 * @param {string} DeviceMAC 12 symbols for device MAC
 */
Tremol.FP.prototype.SetDeviceMAC_Address = function (DeviceMAC) {
	return this.do('SetDeviceMAC_Address', 'DeviceMAC', DeviceMAC);
};

/**
 * @typedef {Object} FMfreeRecordsRes
 * @property {string} FreeFMrecords 4 symbols for the number of free records for Z-report in the FM 
CS 4 symbols for FM MCU flash checksum
 * @property {string} CS 4 symbols for FM MCU flash checksum
 * @property {number} FreeResets Up to 3 symbols for resets in FM
 * @property {number} FreeHeaderChanges Up to 2 symbols for headers changes in FM
 * @property {number} FreeTaxChanges Up to 2 symbols for tax changes in FM
 * @property {number} FreeSDchanges Up to 2 symbols for SD changes in FM
 * @property {number} FreeRegistrationChanges Up to 3 symbols for registration changes in FM
 */

/**
 * Read the number of the remaining free records for Z-report in the Fiscal Memory and check sum, resets, header, tax, sd card and registration changes of FM MCU flash memory.
 * @return {FMfreeRecordsRes}
 */
Tremol.FP.prototype.ReadFMfreeRecords = function () {
	return this.do('ReadFMfreeRecords');
};

/**
 * @typedef {Object} Bluetooth_PasswordRes
 * @property {number} PassLength (Length) Up to 3 symbols for the BT password length
 * @property {string} Password Up to 100 symbols for the BT password
 */

/**
 * Provides information about device's Bluetooth password.
 * @return {Bluetooth_PasswordRes}
 */
Tremol.FP.prototype.ReadBluetooth_Password = function () {
	return this.do('ReadBluetooth_Password');
};

/**
 * Read Electronic Journal Report from receipt number to receipt number.
 * @param {number} StartReceiptNum 6 symbols for initial receipt number included in report in format ######
 * @param {number} EndReceiptNum 6 symbols for final receipt number included in report in format ######
 */
Tremol.FP.prototype.ReadEJFromReceiptToReceipt = function (StartReceiptNum, EndReceiptNum) {
	return this.do('ReadEJFromReceiptToReceipt', 'StartReceiptNum', StartReceiptNum, 'EndReceiptNum', EndReceiptNum);
};

/**
 * Register the sell of department.
 * @param {string} NamePLU 36 symbols for name of sale. 34 symbols are printed on paper.
 * @param {number} DepNum 1 symbol for article department 
attachment, formed in the following manner: DepNum[HEX] + 80h example: 
Dep01 = 81h, Dep02 = 82h … Dep19 = 93h
 * @param {number} Price Up to 10 symbols for article's price.
 * @param {number=} Quantity Up to 10 symbols for article's quantity sold
 * @param {number=} DiscAddP Up to 7 for percentage of discount/addition. Use minus 
sign '-' for discount
 * @param {number=} DiscAddV Up to 8 symbols for percentage of discount/addition. 
Use minus sign '-' for discount
 */
Tremol.FP.prototype.SellPLUfromDep = function (NamePLU, DepNum, Price, Quantity, DiscAddP, DiscAddV) {
	return this.do('SellPLUfromDep', 'NamePLU', NamePLU, 'DepNum', DepNum, 'Price', Price, 'Quantity', Quantity, 'DiscAddP', DiscAddP, 'DiscAddV', DiscAddV);
};

/**
 * Print whole special FM events report.
 */
Tremol.FP.prototype.PrintSpecialEventsFMreport = function () {
	return this.do('PrintSpecialEventsFMreport');
};

/**
 * Provides information about device's idle timeout. This timeout is for closing the connection if there is an inactivity. Maximal value - 7200, minimal value 1. 0 is for never close the connection. This option can be used only if the device has LAN or WiFi.
 * @return {number}
 */
Tremol.FP.prototype.Read_IdleTimeout = function () {
	return this.do('Read_IdleTimeout');
};

/**
 * @typedef {Object} DepartmentDifferentNameRes
 * @property {number} Number 2 symbols department number in format ##
 * @property {string} NameAlbanian 23 characters for Albanian name
 * @property {string} NameSerbian 23 characters Serbian name
 * @property {string} NameEnglish 23 characters English name
 */

/**
 * Read data for the state department number and different names.
 * @param {number} Number 2 symbols department number in format ##
 * @return {DepartmentDifferentNameRes}
 */
Tremol.FP.prototype.ReadDepartmentDifferentName = function (Number) {
	return this.do('ReadDepartmentDifferentName', 'Number', Number);
};

/**
 * Programs the operator's name and password.
 * @param {number} Number Symbols from '1' to '20' corresponding to operator's number
 * @param {string} Name 20 symbols for operator's name
 * @param {string} Password 6 symbols for operator's password
 */
Tremol.FP.prototype.ProgOperator = function (Number, Name, Password) {
	return this.do('ProgOperator', 'Number', Number, 'Name', Name, 'Password', Password);
};

/**
 * Program device's Bluetooth password.
 * @param {number} PassLength Up to 3 symbols for the BT password len
 * @param {string} Password Up to 100 symbols for the BT password
 */
Tremol.FP.prototype.SetBluetooth_Password = function (PassLength, Password) {
	return this.do('SetBluetooth_Password', 'PassLength', PassLength, 'Password', Password);
};

/**
 * @typedef {Object} GPRS_APNRes
 * @property {number} GPRS_APN_Len (Length) Up to 3 symbols for the APN length
 * @property {string} APN Up to 100 symbols for the device's GPRS APN
 */

/**
 * Provides information about device's GRPS APN.
 * @return {GPRS_APNRes}
 */
Tremol.FP.prototype.ReadGPRS_APN = function () {
	return this.do('ReadGPRS_APN');
};

/**
 * @typedef {Object} PLUqtyRes
 * @property {number} PLUNum 5 symbols for article number with leading zeroes in format #####
 * @property {number} AvailableQuantity Up to13 symbols for quantity in stock
 * @property {Tremol.Enums.OptionQuantityType} OptionQuantityType 1 symbol for Quantity flag with next value:  
- '0'- Availability of PLU stock is not monitored  
- '1'- Disable negative quantity  
- '2'- Enable negative quantity
 */

/**
 * Provides information about the quantity registers of the specified article.
 * @param {number} PLUNum 5 symbols for article number with leading zeroes in format: #####
 * @return {PLUqtyRes}
 */
Tremol.FP.prototype.ReadPLUqty = function (PLUNum) {
	return this.do('ReadPLUqty', 'PLUNum', PLUNum);
};

/**
 * Set data for the state department number and different name.
 * @param {number} Number 2 symbols department number in format ##
 * @param {string} NameAlbanian 23 characters for Albanian name
 * @param {string} NameSerbian 23 characters Serbian name
 * @param {string} NameEnglish 23 characters English name
 */
Tremol.FP.prototype.ProgDepartmentDifferentName = function (Number, NameAlbanian, NameSerbian, NameEnglish) {
	return this.do('ProgDepartmentDifferentName', 'Number', Number, 'NameAlbanian', NameAlbanian, 'NameSerbian', NameSerbian, 'NameEnglish', NameEnglish);
};

/**
 * Scan and print all available WiFi networks
 */
Tremol.FP.prototype.ScanAndPrintWiFiNetworks = function () {
	return this.do('ScanAndPrintWiFiNetworks');
};

/**
 * @typedef {Object} SerialAndFiscalNumsRes
 * @property {string} SerialNumber 11 symbols for individual number of the fiscal device
 * @property {string} FMNumber 11 symbols for individual number of the fiscal memory
 * @property {string} ECR_UniqueNum 24 symbols for ECR unique number
 */

/**
 * Provides information about the manufacturing number of the fiscal device, FM number and ECR Unique number.
 * @return {SerialAndFiscalNumsRes}
 */
Tremol.FP.prototype.ReadSerialAndFiscalNums = function () {
	return this.do('ReadSerialAndFiscalNums');
};

/**
 * Program the communication module, which used to talk with the server
 * @param {Tremol.Enums.OptionCommunicationModule} OptionCommunicationModule 1 symbol with value: 
 - '0' - GSM 
 - '1' - LAN
 */
Tremol.FP.prototype.SetServerCommunicationModule = function (OptionCommunicationModule) {
	return this.do('SetServerCommunicationModule', 'OptionCommunicationModule', OptionCommunicationModule);
};

/**
 * @typedef {Object} GPRS_UsernameRes
 * @property {number} GPRS_User_Len (Length) Up to 3 symbols for the GPRS username length
 * @property {string} Username Up to 100 symbols for the device's GPRS username
 */

/**
 * Provides information about device's GPRS username.
 * @return {GPRS_UsernameRes}
 */
Tremol.FP.prototype.ReadGPRS_Username = function () {
	return this.do('ReadGPRS_Username');
};

/**
 * Registers cash received on account or paid out.
 * @param {number} OperNum Symbols from 1 to 20 corresponding to the operator's number
 * @param {string} OperPass 6 symbols for operator's password
 * @param {number} Amount Up to 10 symbols for the amount lodged/withdrawn
 * @param {string=} Text TextLength-2 symbols. In the beginning and in the end of line symbol '#' is 
printed.
 */
Tremol.FP.prototype.ReceivedOnAccount_PaidOut = function (OperNum, OperPass, Amount, Text) {
	return this.do('ReceivedOnAccount_PaidOut', 'OperNum', OperNum, 'OperPass', OperPass, 'Amount', Amount, 'Text', Text);
};

/**
 * After every change on Idle timeout, LAN/WiFi/GPRS usage, LAN/WiFi/TCP/GPRS password or TCP auto start networks settings this Save command needs to be execute.
 */
Tremol.FP.prototype.SaveNetworkSettings = function () {
	return this.do('SaveNetworkSettings');
};

/**
 * @typedef {Object} CMinfoRes
 * @property {string} CMUID 24 symbols for CM unique ID number
 * @property {Date} ProductionDate Up to 16 symbols for FD/CM production date
 * @property {Date} ActivationDate Up to 16 symbols for FD/CM fiscalization date
 * @property {string} FDSN 10 symbols for coupled FD serial number 
CS 4 symbols for CM MCU flash checksum
 * @property {string} CS 4 symbols for CM MCU flash checksum
 */

/**
 * Read CM info
 * @return {CMinfoRes}
 */
Tremol.FP.prototype.ReadCMinfo = function () {
	return this.do('ReadCMinfo');
};

/**
 * Provides information about period in which the sending attempt is made.
 * @return {number}
 */
Tremol.FP.prototype.ReadECRprofileConnectionPeriod = function () {
	return this.do('ReadECRprofileConnectionPeriod');
};

/**
 * Executes the direct command .
 * @param {string} Input Raw request to FP
 * @return {string}
 */
Tremol.FP.prototype.DirectCommand = function (Input) {
	return this.do('DirectCommand', 'Input', Input);
};

/**
 * Storage a detailed FM report by initial and end FM report number.
 * @param {number} StartNum 4 symbols for the initial report number included in report, format ####
 * @param {number} EndNum 4 symbols for the final report number included in report, format ####
 */
Tremol.FP.prototype.ReadDetailedFMReportByZNum = function (StartNum, EndNum) {
	return this.do('ReadDetailedFMReportByZNum', 'StartNum', StartNum, 'EndNum', EndNum);
};

/**
 * Read Electronic Journal Report from by number of Z report blocks.
 * @param {number} StartZNum 4 symbols for initial number report in format ####
 * @param {number} EndZNum 4 symbols for final number report in format ####
 */
Tremol.FP.prototype.ReadEJByZBlocks = function (StartZNum, EndZNum) {
	return this.do('ReadEJByZBlocks', 'StartZNum', StartZNum, 'EndZNum', EndZNum);
};

/**
 * @typedef {Object} CurrentRecInfoRes
 * @property {Tremol.Enums.OptionIsReceiptOpened} OptionIsReceiptOpened 1 symbol with value: 
 - '0' - No 
 - '1' - Yes
 * @property {string} ReceiptType 1 symbol with value '1'
 * @property {string} SalesNumber 3 symbols for number of sales
 * @property {string} SubtotalVATG0 11 symbols for subtotal from goods by VAT groups
 * @property {string} SubtotalVATG1 11 symbols for subtotal from goods by VAT groups
 * @property {string} SubtotalVATG2 11 symbols for subtotal from goods by VAT groups
 * @property {string} SubtotalVATG3 11 symbols for subtotal from goods by VAT groups
 * @property {string} SubtotalVATG4 11 symbols for subtotal from goods by VAT groups
 * @property {string} SubtotalVATG5 11 symbols for subtotal from goods by VAT groups
 * @property {string} SubtotalVATG6 11 symbols for subtotal from goods by VAT groups
 * @property {string} SubtotalVATG7 11 symbols for subtotal from goods by VAT groups
 * @property {Tremol.Enums.OptionInitiatedPayment} OptionInitiatedPayment 1 symbol with value: 
 - '1' - initiated payment 
 - '0' - not initiated payment
 * @property {Tremol.Enums.OptionFinalizedPayment} OptionFinalizedPayment 1 symbol with value: 
 - '1' - finalized payment 
 - '0' - not finalized payment
 * @property {Tremol.Enums.OptionPowerDownInReceipt} OptionPowerDownInReceipt 1 symbol with value: 
- '0' - No 
- '1' - Yes
 * @property {number} ChangeAmount Up to 11 symbols the amount of the due change in the stated payment 
type
 * @property {Tremol.Enums.OptionChangeType} OptionChangeType 1 symbols with value: 
 - '0' - Change In Cash 
 - '1' - Same As The payment 
 - '2' - Change In Currency
 */

/**
 * Read the current status of the receipt.
 * @return {CurrentRecInfoRes}
 */
Tremol.FP.prototype.ReadCurrentRecInfo = function () {
	return this.do('ReadCurrentRecInfo');
};

/**
 * Program device's WiFi network name where it will connect. To apply use - 4Eh / N - Save network settings
 * @param {number} WiFiNameLength Up to 3 symbols for the WiFi network name len
 * @param {string} WiFiNetworkName Up to 100 symbols for the device's WiFi ssid network name
 */
Tremol.FP.prototype.SetWiFi_NetworkName = function (WiFiNameLength, WiFiNetworkName) {
	return this.do('SetWiFi_NetworkName', 'WiFiNameLength', WiFiNameLength, 'WiFiNetworkName', WiFiNetworkName);
};

/**
 * Read Electronic Journal Report from by number of Z report blocks only of the current receipt .
 * @param {number} StartZNum 4 symbols for initial number report in format ####
 * @param {number} EndZNum 4 symbols for final number report in format ####
 */
Tremol.FP.prototype.ReadEJByZBlocksWithoutReceipts = function (StartZNum, EndZNum) {
	return this.do('ReadEJByZBlocksWithoutReceipts', 'StartZNum', StartZNum, 'EndZNum', EndZNum);
};

/**
 * Select type of display
 * @param {Tremol.Enums.OptionExternalDisplay} OptionExternalDisplay 1 symbol with value: 
-'1' - Tremol display 
-'0' - Others
 */
Tremol.FP.prototype.SelectExternalDisplay = function (OptionExternalDisplay) {
	return this.do('SelectExternalDisplay', 'OptionExternalDisplay', OptionExternalDisplay);
};

/**
 * Print a detailed FM report by initial and end FM report number.
 * @param {number} StartNum 4 symbols for the initial report number included in report, format ####
 * @param {number} EndNum 4 symbols for the final report number included in report, format ####
 */
Tremol.FP.prototype.PrintDetailedFMReportByNum = function (StartNum, EndNum) {
	return this.do('PrintDetailedFMReportByNum', 'StartNum', StartNum, 'EndNum', EndNum);
};

/**
 * Read info for enable/disable short receipts
 * @return {Tremol.Enums.OptionActivationRS}
 */
Tremol.FP.prototype.ReadShortReceiptSending = function () {
	return this.do('ReadShortReceiptSending');
};

/**
 * Provides information about TCP device MAC address
 * @return {string}
 */
Tremol.FP.prototype.ReadDeviceMAC_Address = function () {
	return this.do('ReadDeviceMAC_Address');
};

/**
 * Register the sell of article with specified name, price, quantity, VAT class and/or discount/addition on the transaction.
 * @param {string} NamePLU 36 symbols for article's name
 * @param {Tremol.Enums.OptionVATClass} OptionVATClass 1 character for VAT class: 
 - 'A' - VAT Class A 
 - 'B' - VAT Class B 
 - 'C' - VAT Class C 
 - 'D' - VAT Class D 
 - 'E' - VAT Class E 
 - 'F' - VAT Class F 
 - 'G' - VAT Class G 
 - 'H' - VAT Class H
 * @param {number} Price Up to 10 symbols for article's price.
 * @param {number=} Quantity Up to 10 symbols for quantity
 * @param {number=} DiscAddP Up to 7 symbols for percentage of discount/addition. 
Use minus sign '-' for discount
 * @param {number=} DiscAddV Up to 8 symbols for value of discount/addition. 
Use minus sign '-' for discount
 * @param {number=} DepNum 2 symbol for article department 
attachment, formed in the following manner: DepNum[HEX] + 80h 
example: Dep01 = 81h, Dep02 = 82h … Dep19 = 93h
 */
Tremol.FP.prototype.SellPLUwithSpecifiedVAT = function (NamePLU, OptionVATClass, Price, Quantity, DiscAddP, DiscAddV, DepNum) {
	return this.do('SellPLUwithSpecifiedVAT', 'NamePLU', NamePLU, 'OptionVATClass', OptionVATClass, 'Price', Price, 'Quantity', Quantity, 'DiscAddP', DiscAddP, 'DiscAddV', DiscAddV, 'DepNum', DepNum);
};

/**
 * Print a brief FM report by initial and end date.
 * @param {Date} StartDate 6 symbols for initial date in the DDMMYY format
 * @param {Date} EndDate 6 symbols for final date in the DDMMYY format
 */
Tremol.FP.prototype.PrintBriefFMReportByDate = function (StartDate, EndDate) {
	return this.do('PrintBriefFMReportByDate', 'StartDate', StartDate, 'EndDate', EndDate);
};

/**
 * Read Service mode status
 * @return {Tremol.Enums.OptionServiceMode}
 */
Tremol.FP.prototype.ReadServiceMode = function () {
	return this.do('ReadServiceMode');
};

/**
 * Shows a 20-symbols text in the upper external display line.
 * @param {string} Text 20 symbols text
 */
Tremol.FP.prototype.DisplayTextLine1 = function (Text) {
	return this.do('DisplayTextLine1', 'Text', Text);
};

/**
 * @typedef {Object} ServerAddressRes
 * @property {number} ParamLength Up to 3 symbols for parameter length
 * @property {string} ServerAddress Up to 100 symbols for server password
 */

/**
 * Provides information about the ECR's password
 * @return {ServerAddressRes}
 */
Tremol.FP.prototype.ReadServerAddress = function () {
	return this.do('ReadServerAddress');
};

/**
 * @typedef {Object} VATratesRes
 * @property {number} VATrate0 Value of VAT rate A from 7 symbols in format ##.##%
 * @property {number} VATrate1 Value of VAT rate B from 7 symbols in format ##.##%
 * @property {number} VATrate2 Value of VAT rate C from 7 symbols in format ##.##%
 * @property {number} VATrate3 Value of VAT rate D from 7 symbols in format ##.##%
 * @property {number} VATrate4 Value of VAT rate E from 7 symbols in format ##.##%
 * @property {number} VATrate5 Value of VAT rate F from 7 symbols in format ##.##%
 * @property {number} VATrate6 Value of VAT rate G from 7 symbols in format ##.##%
 * @property {number} VATrate7 Value of VAT rate H from 7 symbols in format ##.##%
 */

/**
 * Provides information about the current VAT rates which are the last values stored into the FM.
 * @return {VATratesRes}
 */
Tremol.FP.prototype.ReadVATrates = function () {
	return this.do('ReadVATrates');
};

/**
 * @typedef {Object} DailyReceivedSalesAmountsRes
 * @property {number} AmountPayment Up to 11 symbols for amount received from sales by cash
 * @property {number} AmountPaymentOthers Up to 11 symbols for amount received from sales by others payment
 */

/**
 * Provides information about the amounts received from sales.
 * @return {DailyReceivedSalesAmountsRes}
 */
Tremol.FP.prototype.ReadDailyReceivedSalesAmounts = function () {
	return this.do('ReadDailyReceivedSalesAmounts');
};

/**
 * Programs available quantity and quantiy type for a certain article in the internal database.
 * @param {number} PLUNum 5 symbols for article number in format: #####
 * @param {number} AvailableQuantity Up to 11 symbols for quantity in stock
 * @param {Tremol.Enums.OptionQuantityType} OptionQuantityType 1 symbol for Quantity flag with next value:  
 - '0'- Availability of PLU stock is not monitored  
 - '1'- Disable negative quantity  
 - '2'- Enable negative quantity
 */
Tremol.FP.prototype.ProgPLUqty = function (PLUNum, AvailableQuantity, OptionQuantityType) {
	return this.do('ProgPLUqty', 'PLUNum', PLUNum, 'AvailableQuantity', AvailableQuantity, 'OptionQuantityType', OptionQuantityType);
};

/**
 * @typedef {Object} RegistrationInfoRes
 * @property {string} IDNum 13 symbols owner's ID number
 * @property {string} VATNum 15 symbols for owner's VAT registration number
 * @property {string} RegistrationNumber Register number on the Fiscal device by registration
 * @property {Date} RegistrationDate Date of registration
 */

/**
 * Provides information about the owner's numbers and registration date time.
 * @return {RegistrationInfoRes}
 */
Tremol.FP.prototype.ReadRegistrationInfo = function () {
	return this.do('ReadRegistrationInfo');
};

/**
 * Clears the external display.
 */
Tremol.FP.prototype.ClearDisplay = function () {
	return this.do('ClearDisplay');
};

/**
 * Program device's TCP network DHCP enabled or disabled. To apply use - 4Eh / N - Save network settings
 * @param {Tremol.Enums.OptionDhcpStatus} OptionDhcpStatus 1 symbol with value: 
 - '0' - Disabled 
 - '1' - Enabled
 */
Tremol.FP.prototype.SetDHCP_Enabled = function (OptionDhcpStatus) {
	return this.do('SetDHCP_Enabled', 'OptionDhcpStatus', OptionDhcpStatus);
};

/**
 * Program device's GPRS APN. To apply use - SaveNetworkSettings()
 * @param {number} GPRS_APN_Len Up to 3 symbols for the APN len
 * @param {string} APN Up to 100 symbols for the device's GPRS APN
 */
Tremol.FP.prototype.SetGPRS_APN = function (GPRS_APN_Len, APN) {
	return this.do('SetGPRS_APN', 'GPRS_APN_Len', GPRS_APN_Len, 'APN', APN);
};

/**
 * @typedef {Object} DailyPObyOperatorRes
 * @property {number} OperNum Symbols from 1 to 20 corresponding to operator's number
 * @property {number} AmountPO_Payments Up to 11 symbols for the PO by type of payment
 * @property {number} NumPO Up to 5 symbols for the total number of operations
 */

/**
 * Provides information about the PO and the total number of operations by specified operator.
 * @param {number} OperNum Symbols from 1 to 20 corresponding to operator's 
number
 * @return {DailyPObyOperatorRes}
 */
Tremol.FP.prototype.ReadDailyPObyOperator = function (OperNum) {
	return this.do('ReadDailyPObyOperator', 'OperNum', OperNum);
};

/**
 * Programs receipt view parameter
 * @param {Tremol.Enums.OptionReceiptView} OptionReceiptView 1 symbol with value: 
 - '0' - Standart view 
 - '1' - Shortened view of receipt
 */
Tremol.FP.prototype.ProgramReceiptViewParameter = function (OptionReceiptView) {
	return this.do('ProgramReceiptViewParameter', 'OptionReceiptView', OptionReceiptView);
};

/**
 * Printing Electronic Journal Report from receipt number to receipt number.
 * @param {number} StartReceiptNum 6 symbols for initial receipt number included in report in format ######
 * @param {number} EndReceiptNum 6 symbols for final receipt number included in report in format ######
 */
Tremol.FP.prototype.PrintEJByReceiptNumFromZrep = function (StartReceiptNum, EndReceiptNum) {
	return this.do('PrintEJByReceiptNumFromZrep', 'StartReceiptNum', StartReceiptNum, 'EndReceiptNum', EndReceiptNum);
};

/**
 * Program the price for a certain article from the internal database.
 * @param {number} PLUNum 5 symbols for article number in format: #####
 * @param {number} Price Up to 10 symbols for article price
 * @param {Tremol.Enums.OptionPrice} OptionPrice 1 byte for Price flag with next value: 
 - '0'- Free price is disable valid only programmed price 
 - '1'- Free price is enable 
 - '2'- Limited price
 */
Tremol.FP.prototype.ProgPLUprice = function (PLUNum, Price, OptionPrice) {
	return this.do('ProgPLUprice', 'PLUNum', PLUNum, 'Price', Price, 'OptionPrice', OptionPrice);
};

/**
 *  Reads raw bytes from FP.
 * @param {number} Count How many bytes to read if EndChar is not specified
 * @param {string} EndChar The character marking the end of the data. If present Count parameter is ignored.
 * @return {Uint8Array}
 */
Tremol.FP.prototype.RawRead = function (Count, EndChar) {
	return this.do('RawRead', 'Count', Count, 'EndChar', EndChar);
};

/**
 * Provides information about device's DHCP status
 * @return {Tremol.Enums.OptionDhcpStatus}
 */
Tremol.FP.prototype.ReadDHCP_Status = function () {
	return this.do('ReadDHCP_Status');
};

/**
 * @typedef {Object} TCP_AddressesRes
 * @property {Tremol.Enums.OptionAddressType} OptionAddressType (Address) 1 symbol with value: 
 - '2' - IP address 
 - '3' - Subnet Mask 
 - '4' - Gateway address 
 - '5' - DNS address
 * @property {string} DeviceAddress 15 symbols for the device's addresses
 */

/**
 * Provides information about device's IP address, subnet mask, gateway address, DNS address.
 * @param {Tremol.Enums.OptionAddressType} OptionAddressType 1 symbol with value: 
 - '2' - IP address 
 - '3' - Subnet Mask 
 - '4' - Gateway address 
 - '5' - DNS address
 * @return {TCP_AddressesRes}
 */
Tremol.FP.prototype.ReadTCP_Addresses = function (OptionAddressType) {
	return this.do('ReadTCP_Addresses', 'OptionAddressType', OptionAddressType);
};

/**
 * Programs the general data for a certain taxi service in the internal FD database. The name field is fixed.
 * @param {string} ServiceNum 2 symbols for service number
 * @param {string} ServiceNameAL 30 symbols for service name
 * @param {string} ServiceNameSR 30 symbols for service name
 * @param {string} ServiceNameEN 30 symbols for service name
 * @param {Tremol.Enums.OptionVATClass} OptionVATClass 1 character for article VAT Class: 
 - 'A' - VAT Class A 
 - 'B' - VAT Class B 
 - 'C' - VAT Class C 
 - 'D' - VAT Class D 
 - 'E' - VAT Class E 
 - 'F' - VAT Class F 
 - 'G' - VAT Class G 
 - 'H' - VAT Class H
 */
Tremol.FP.prototype.ProgTaxiServiceGeneral = function (ServiceNum, ServiceNameAL, ServiceNameSR, ServiceNameEN, OptionVATClass) {
	return this.do('ProgTaxiServiceGeneral', 'ServiceNum', ServiceNum, 'ServiceNameAL', ServiceNameAL, 'ServiceNameSR', ServiceNameSR, 'ServiceNameEN', ServiceNameEN, 'OptionVATClass', OptionVATClass);
};

/**
 * Provides information about device's profile type.
 * @return {Tremol.Enums.OptionProfileType}
 */
Tremol.FP.prototype.ReadECRprofileType = function () {
	return this.do('ReadECRprofileType');
};

/**
 * Program the contents of a header lines.
 * @param {Tremol.Enums.OptionHeaderLine} OptionHeaderLine 1 symbol with value: 
 - '1' - Header 1 
 - '2' - Header 2 
 - '3' - Header 3 
 - '4' - Header 4 
 - '5' - Header 5 
 - '6' - Header 6 
 - '7' - Header 7 
 - '8' - Header 8
 * @param {string} HeaderText TextLength symbols for header lines
 */
Tremol.FP.prototype.ProgHeader = function (OptionHeaderLine, HeaderText) {
	return this.do('ProgHeader', 'OptionHeaderLine', OptionHeaderLine, 'HeaderText', HeaderText);
};

/**
 * Read the language of the device
 * @return {Tremol.Enums.OptionLanguage}
 */
Tremol.FP.prototype.ReadLanguage = function () {
	return this.do('ReadLanguage');
};

/**
 * Prints out SD card, crypto modul and FM diagnostic receipt.
 * @param {Tremol.Enums.OptionDiagnostics} OptionDiagnostics 1 symbol with values: 
 - 'S'- SD card 
 - 'C' - Crypto modul 
 - 'F' - FM
 */
Tremol.FP.prototype.PrintOptionalDiagnostics = function (OptionDiagnostics) {
	return this.do('PrintOptionalDiagnostics', 'OptionDiagnostics', OptionDiagnostics);
};

/**
 * @typedef {Object} PLUDifferentNameRes
 * @property {number} PLUNum (PLU Number) 5 symbols for article number in format: #####
 * @property {string} PLUNameAlbanian 32 symbols for Albanian PLU
 * @property {string} PLUNameSerbian 32 symbols for Serbian PLU
 * @property {string} PLUNameEnglish 32 symbols for English PLU
 */

/**
 * Provides information about the price and different name of the specified article.
 * @param {number} PLUNum 5 symbols for article number with leading zeroes in format: #####
 * @return {PLUDifferentNameRes}
 */
Tremol.FP.prototype.ReadPLUDifferentName = function (PLUNum) {
	return this.do('ReadPLUDifferentName', 'PLUNum', PLUNum);
};

/**
 * Set data for the state department number from the internal FD database.
 * @param {number} Number 2 symbols department number in format ##
 * @param {string} Name 23 characters department name
 * @param {Tremol.Enums.OptionVATClass} OptionVATClass 1 character for article VAT Class: 
 - 'A' - VAT Class A 
 - 'B' - VAT Class B 
 - 'C' - VAT Class C 
 - 'D' - VAT Class D 
 - 'E' - VAT Class E 
 - 'F' - VAT Class F 
 - 'G' - VAT Class G 
 - 'H' - VAT Class H
 * @param {number} Price Up to 10 symbols for department price
 * @param {string} FlagsPrice 1 symbol with value: 
Flags.7=1 
Flags.6=0 
Flags.5=0 
Flags.4=0 
Flags.3=1 Yes, Flags.3=0 No (Fractional quantity disabled) 
Flags.2=1 Yes, Flags.2=0 No (Single Transaction) 
Flags.1=1 Yes, Flags.1=0 No (Free price limited) 
Flags.0=1 Yes, Flags.0=0 No (Free price enabled)
 */
Tremol.FP.prototype.ProgDepartmentOption1 = function (Number, Name, OptionVATClass, Price, FlagsPrice) {
	return this.do('ProgDepartmentOption1', 'Number', Number, 'Name', Name, 'OptionVATClass', OptionVATClass, 'Price', Price, 'FlagsPrice', FlagsPrice);
};

/**
 * Removes all paired devices.
 */
Tremol.FP.prototype.UnpairAllDevices = function () {
	return this.do('UnpairAllDevices');
};

/**
 * Shows the current date and time on the external display.
 */
Tremol.FP.prototype.DisplayDateTime = function () {
	return this.do('DisplayDateTime');
};

/**
 * Register the refund of article with specified name, price, quantity, VAT class and/or discount/addition on the transaction.
 * @param {string} NamePLU 36 symbols for article's name
 * @param {Tremol.Enums.OptionVATClass} OptionVATClass 1 character for VAT class: 
 - 'A' - VAT Class A 
 - 'B' - VAT Class B 
 - 'C' - VAT Class C 
 - 'D' - VAT Class D 
 - 'E' - VAT Class E 
 - 'F' - VAT Class F 
 - 'G' - VAT Class G 
 - 'H' - VAT Class H
 * @param {number} Price Up to 10 symbols for article's price.
 * @param {number=} Quantity Up to 10 symbols for quantity
 * @param {number=} DiscAddP Up to 7 symbols for percentage of discount/addition. 
Use minus sign '-' for discount
 * @param {number=} DiscAddV Up to 8 symbols for value of discount/addition. 
Use minus sign '-' for discount
 * @param {number=} DepNum 1 symbol for article department 
attachment, formed in the following manner; example: Dep01=81h, 
Dep02=82h … Dep19=93h
 */
Tremol.FP.prototype.RefundPLUwithSpecifiedVAT = function (NamePLU, OptionVATClass, Price, Quantity, DiscAddP, DiscAddV, DepNum) {
	return this.do('RefundPLUwithSpecifiedVAT', 'NamePLU', NamePLU, 'OptionVATClass', OptionVATClass, 'Price', Price, 'Quantity', Quantity, 'DiscAddP', DiscAddP, 'DiscAddV', DiscAddV, 'DepNum', DepNum);
};

/**
 * Set device's TCP autostart . To apply use - 4Eh / N - Save network settings
 * @param {Tremol.Enums.OptionTCPAutoStart} OptionTCPAutoStart 1 symbol with value: 
 - '0' - No 
 - '1' - Yes
 */
Tremol.FP.prototype.SetTCP_AutoStart = function (OptionTCPAutoStart) {
	return this.do('SetTCP_AutoStart', 'OptionTCPAutoStart', OptionTCPAutoStart);
};

/**
 * Sets the used TCP module for communication - Lan or WiFi. To apply use - 4Eh / N - Save network settings
 * @param {Tremol.Enums.OptionUsedModule} OptionUsedModule 1 symbol with value: 
 - '1' - LAN 
 - '2' - WiFi
 */
Tremol.FP.prototype.SetTCP_ActiveModule = function (OptionUsedModule) {
	return this.do('SetTCP_ActiveModule', 'OptionUsedModule', OptionUsedModule);
};

/**
 * @typedef {Object} PLUNameRes
 * @property {number} PLUNum (PLU Number) 5 symbols for article number in format: #####
 * @property {string} PLUName 32 symbols for PLU name
 */

/**
 * Provides information about the price and name of the specified  article.
 * @param {number} PLUNum 5 symbols for article number in format: #####
 * @return {PLUNameRes}
 */
Tremol.FP.prototype.ReadPLUName = function (PLUNum) {
	return this.do('ReadPLUName', 'PLUNum', PLUNum);
};

/**
 * Read the used TCP module for communication - Lan or WiFi. Command is available if the device support both modules only.
 * @return {Tremol.Enums.OptionUsedModule}
 */
Tremol.FP.prototype.ReadTCP_UsedModule = function () {
	return this.do('ReadTCP_UsedModule');
};

/**
 * Program the price for a certain article and name.
 * @param {number} PLUNum 5 symbols for article number in format: #####
 * @param {string} PLUName 32 symbols for PLU name
 */
Tremol.FP.prototype.ProgPLUName = function (PLUNum, PLUName) {
	return this.do('ProgPLUName', 'PLUNum', PLUNum, 'PLUName', PLUName);
};

/**
 * Feeds one line of paper.
 */
Tremol.FP.prototype.PaperFeed = function () {
	return this.do('PaperFeed');
};

/**
 * Close the fiscal receipt (Fiscal receipt, or Non-fical receipt). When the payment is finished.
 */
Tremol.FP.prototype.CloseReceipt = function () {
	return this.do('CloseReceipt');
};

/**
 * Prints barcode from type stated by CodeType and CodeLen and with data stated in CodeData field.
 * @param {Tremol.Enums.OptionCodeType} OptionCodeType 1 symbol with possible values: 
 - '0' - UPC A 
 - '1' - UPC E 
 - '2' - EAN 13 
 - '3' - EAN 8 
 - '4' - CODE 39 
 - '5' - ITF 
 - '6' - CODABAR 
 - 'H' - CODE 93 
 - 'I' - CODE 128
 * @param {number} CodeLen 1..2 bytes for number of bytes according to the table
 * @param {string} CodeData From 0 to 255 bytes data in range according to the table
 * @param {Tremol.Enums.OptionCenter=} OptionCenter 1 symbol in order to place the barcode in the middle: 
-'1' - Yes 
-'0' - No
 */
Tremol.FP.prototype.PrintBarcode = function (OptionCodeType, CodeLen, CodeData, OptionCenter) {
	return this.do('PrintBarcode', 'OptionCodeType', OptionCodeType, 'CodeLen', CodeLen, 'CodeData', CodeData, 'OptionCenter', OptionCenter);
};

/**
 * Print a department report with or without zeroing ('Z' or 'X').
 * @param {Tremol.Enums.OptionZeroing} OptionZeroing 1 symbol with value: 
 - 'Z' - Zeroing 
 - 'X' - Without zeroing
 */
Tremol.FP.prototype.PrintDepartmentReport = function (OptionZeroing) {
	return this.do('PrintDepartmentReport', 'OptionZeroing', OptionZeroing);
};

/**
 * Program the language of the device
 * @param {Tremol.Enums.OptionLanguage} OptionLanguage 1 symbol with value: 
 - '0' - Albanian 
 - '1' - Serbian 
 - '2' - English
 */
Tremol.FP.prototype.ProgramLanguage = function (OptionLanguage) {
	return this.do('ProgramLanguage', 'OptionLanguage', OptionLanguage);
};

/**
 * Shows a 20-symbols text in the lower external display line.
 * @param {string} Text 20 symbols text
 */
Tremol.FP.prototype.DisplayTextLine2 = function (Text) {
	return this.do('DisplayTextLine2', 'Text', Text);
};

/**
 * Temporary enable/disable short receipts sending
 * @param {Tremol.Enums.OptionActivationRS} OptionActivationRS 1 symbol with value : 
- '1' - Yes 
- '0' - No
 */
Tremol.FP.prototype.ManageShortReceiptSending = function (OptionActivationRS) {
	return this.do('ManageShortReceiptSending', 'OptionActivationRS', OptionActivationRS);
};

/**
 * @typedef {Object} DailyCountersRes
 * @property {number} TotalReciepts 5 symbols for total number of fiscal receipts
 * @property {number} NumLastFMBlock Up to 5 symbols for number of the last FM report
 * @property {number} NumEJ Up to 5 symbols for number of EJ
 * @property {Date} DateTime 16 symbols for date and time of the last block storage in FM in format 
"DD-MM-YYYY HH:MM"
 */

/**
 * Provides information about the total fiscal counters and last Z- report date and time.
 * @return {DailyCountersRes}
 */
Tremol.FP.prototype.ReadDailyCounters = function () {
	return this.do('ReadDailyCounters');
};

/**
 * Program device's WiFi network password where it will connect. To apply use - 4Eh / N - Save network settings
 * @param {number} PassLength Up to 3 symbols for the WiFi password len
 * @param {string} Password Up to 100 symbols for the device's WiFi password
 */
Tremol.FP.prototype.SetWiFi_Password = function (PassLength, Password) {
	return this.do('SetWiFi_Password', 'PassLength', PassLength, 'Password', Password);
};

/**
 * Start Bluetooth test on the device and print out the result
 */
Tremol.FP.prototype.StartTest_Bluetooth = function () {
	return this.do('StartTest_Bluetooth');
};

/**
 * Print current headers and Fiscal Memory operative header
 */
Tremol.FP.prototype.PrintCurrentHeader = function () {
	return this.do('PrintCurrentHeader');
};

/**
 * Erase all articles in PLU database.
 * @param {string} Password 6 symbols for password
 */
Tremol.FP.prototype.EraseAllPLUs = function (Password) {
	return this.do('EraseAllPLUs', 'Password', Password);
};

/**
 * Store the header into fiscal memory.
 * @param {string} Password 6-symbols string
 */
Tremol.FP.prototype.StoreCurrentHeaderInFM = function (Password) {
	return this.do('StoreCurrentHeaderInFM', 'Password', Password);
};

/**
 * @typedef {Object} DailyRAbyOperatorRes
 * @property {number} OperNum Symbols from 1 to 20 corresponding to operator's number
 * @property {number} AmountRA_Payments Up to 11 symbols for the RA by type of payment
 * @property {number} NumRA Up to 5 symbols for the total number of operations
 */

/**
 * Provides information about the RA and the total number of operations by specified operator.
 * @param {number} OperNum Symbols from 1 to 20 corresponding to operator's 
number
 * @return {DailyRAbyOperatorRes}
 */
Tremol.FP.prototype.ReadDailyRAbyOperator = function (OperNum) {
	return this.do('ReadDailyRAbyOperator', 'OperNum', OperNum);
};

/**
 * Start GPRS test on the device and print out the result
 */
Tremol.FP.prototype.StartTest_GPRS = function () {
	return this.do('StartTest_GPRS');
};

/**
 * Read receipt view parameter
 * @return {Tremol.Enums.OptionReceiptView}
 */
Tremol.FP.prototype.ReadReceiptViewParameter = function () {
	return this.do('ReadReceiptViewParameter');
};

/**
 * @typedef {Object} HeaderRes
 * @property {Tremol.Enums.OptionHeaderLine} OptionHeaderLine (Line Number) 1 symbol with value: 
 - '1' - Header 1 
 - '2' - Header 2 
 - '3' - Header 3 
 - '4' - Header 4 
 - '5' - Header 5 
 - '6' - Header 6 
 - '7' - Header 7 
 - '8' - Header 8
 * @property {string} HeaderText TextLength symbols
 */

/**
 * Provides the content of the header lines.
 * @param {Tremol.Enums.OptionHeaderLine} OptionHeaderLine 1 symbol with value: 
 - '1' - Header 1 
 - '2' - Header 2 
 - '3' - Header 3 
 - '4' - Header 4 
 - '5' - Header 5 
 - '6' - Header 6 
 - '7' - Header 7 
 - '8' - Header 8
 * @return {HeaderRes}
 */
Tremol.FP.prototype.ReadHeader = function (OptionHeaderLine) {
	return this.do('ReadHeader', 'OptionHeaderLine', OptionHeaderLine);
};

/**
 * Register the specified service from the internal FD DB.
 * @param {Tremol.Enums.OptionSign} OptionSign 1 symbol with optional value: 
- '+' - Sale 
- '-'  - Correction 
ServiceNumber 2 symbols for Service number of FD's database in format ##
 * @param {number} ServiceNum ber 2 symbols for Service number of FD's database in format ##
 * @param {Date} StartTime in format: 'hh:mm'
 * @param {Date} EndTime in format: 'hh:mm'
 * @param {number} Duration 1..7 symbols for Duration in seconds
 * @param {number} Distance 1..7 symbols for Distance in meters
 * @param {number} InitialSUM Up to 8 symbols for Initial fee
 * @param {number} TransportSUM Up to 8 symbols for Transport sum
 * @param {number} StayMinutes 1..4 symbols for Stay in minutes
 * @param {number} StaySUM Up to 8 symbols for Stay sum
 * @param {number=} DiscAddV Up to 8 symbols for percentage of 
discount/addition. Use minus sign '-' for discount
 */
Tremol.FP.prototype.SellTaxiService = function (OptionSign, ServiceNum, StartTime, EndTime, Duration, Distance, InitialSUM, TransportSUM, StayMinutes, StaySUM, DiscAddV) {
	return this.do('SellTaxiService', 'OptionSign', OptionSign, 'ServiceNum', ServiceNum, 'StartTime', StartTime, 'EndTime', EndTime, 'Duration', Duration, 'Distance', Distance, 'InitialSUM', InitialSUM, 'TransportSUM', TransportSUM, 'StayMinutes', StayMinutes, 'StaySUM', StaySUM, 'DiscAddV', DiscAddV);
};

/**
 * Start paper cutter. The command works only in fiscal printer devices.
 */
Tremol.FP.prototype.CutPaper = function () {
	return this.do('CutPaper');
};

/**
 * @typedef {Object} DeviceModuleSupportByFirmwareRes
 * @property {Tremol.Enums.OptionLAN} OptionLAN 1 symbol for LAN support 
 - '0' - No 
 - '1' - Yes
 * @property {Tremol.Enums.OptionWiFi} OptionWiFi 1 symbol for WiFi support 
 - '0' - No 
 - '1' - Yes
 * @property {Tremol.Enums.OptionGPRS} OptionGPRS 1 symbol for GPRS support 
 - '0' - No 
 - '1' - Yes 
BT (Bluetooth) 1 symbol for Bluetooth support 
 - '0' - No 
 - '1' - Yes
 * @property {Tremol.Enums.OptionBT} OptionBT (Bluetooth) 1 symbol for Bluetooth support 
 - '0' - No 
 - '1' - Yes
 */

/**
 * Provide an information about modules supported by device's firmware.
 * @return {DeviceModuleSupportByFirmwareRes}
 */
Tremol.FP.prototype.ReadDeviceModuleSupportByFirmware = function () {
	return this.do('ReadDeviceModuleSupportByFirmware');
};

/**
 * @typedef {Object} WiFi_PasswordRes
 * @property {number} PassLength (Length) Up to 3 symbols for the WiFi password length
 * @property {string} Password Up to 100 symbols for the device's WiFi password
 */

/**
 * Read device's connected WiFi network password
 * @return {WiFi_PasswordRes}
 */
Tremol.FP.prototype.ReadWiFi_Password = function () {
	return this.do('ReadWiFi_Password');
};

/**
 * Program the Barcode number for a certain article (item) from the internal database.
 * @param {number} PLUNum 5 symbols for article number in format: #####
 * @param {string} Barcode 13 symbols for barcode
 */
Tremol.FP.prototype.ProgPLUbarcode = function (PLUNum, Barcode) {
	return this.do('ProgPLUbarcode', 'PLUNum', PLUNum, 'Barcode', Barcode);
};

/**
 * Prints a detailed FM report by initial and end date.
 * @param {Date} StartDate 6 symbols for initial date in the DDMMYY format
 * @param {Date} EndDate 6 symbols for final date in the DDMMYY format
 */
Tremol.FP.prototype.PrintDetailedFMReportByDate = function (StartDate, EndDate) {
	return this.do('PrintDetailedFMReportByDate', 'StartDate', StartDate, 'EndDate', EndDate);
};

/**
 * Store a brief FM report by initial and end FM report number.
 * @param {number} StartNum 4 symbols for the initial report number included in report, format ####
 * @param {number} EndNum 4 symbols for the final report number included in report, format ####
 */
Tremol.FP.prototype.ReadBriefFMReportByNum = function (StartNum, EndNum) {
	return this.do('ReadBriefFMReportByNum', 'StartNum', StartNum, 'EndNum', EndNum);
};

/**
 * Read the number of symbols per line.
 * @return {number}
 */
Tremol.FP.prototype.ReadSymbolsPerLine = function () {
	return this.do('ReadSymbolsPerLine');
};

/**
 * @typedef {Object} PLUgeneralRes
 * @property {number} PLUNum 5 symbols for article number with leading zeroes in format: #####
 * @property {string} PLUName 32 symbols for article name
 * @property {number} Price 1..11 symbols for article price
 * @property {string} FlagsPriceQty (Setting price, quantity, type of goods) 1 symbols with value: 
Flags.7=1 
Flags.6=0 
Flags.5=1 Yes, Flags.5=0 No (Fractional quantity disabled) 
Flags.4=1 Yes, Flags.4=0 No (Single Transaction)  
Flags.3=1 Yes, Flags.3=0 No (Allow negative) 
Flags.2=1 Yes, Flags.2=0 No (Monitoring quantity in stock) 
Flags.1=1 Yes, Flags.1=0 No (Free price limited) 
Flags.0=1 Yes, Flags.0=0 No (Free price enabled)
 * @property {Tremol.Enums.OptionVATClass} OptionVATClass 1 character for article VAT Class: 
 - 'A' - VAT Class A 
 - 'B' - VAT Class B 
 - 'C' - VAT Class C 
 - 'D' - VAT Class D 
 - 'E' - VAT Class E 
 - 'F' - VAT Class F 
 - 'G' - VAT Class G 
 - 'H' - VAT Class H
 * @property {number} BelongToDepNumber BelongToDepNo + 80h, 1 symbol for PLU department = 0x80 … 0x93
 * @property {number} AvailableQuantity Up to 11 symbols for quantity in stock
 * @property {string} Barcode 13 symbols for article barcode
 * @property {number} TurnoverAmount Up to 11 symbols for PLU accumulated turnover
 * @property {number} SoldQuantity Up to 11 symbols for Sales quantity of the article
 * @property {number} RefundAmount Up to 11 symbols for PLU accumulated refund
 * @property {number} RefundQTY Up to 11 symbols for number of refund quantity of PLU
 * @property {number} LastZReportNumber Up to 5 symbols for the number of the last article report with zeroing
 * @property {Date} LastZReportDate 16 symbols for the date and time in format "DD-MM-YYYY HH:MM"
 */

/**
 * Provides information about the general registers of the specified.
 * @param {number} PLUNum 5 symbols for article number with leading zeroes in format: #####
 * @return {PLUgeneralRes}
 */
Tremol.FP.prototype.ReadPLUgeneral = function (PLUNum) {
	return this.do('ReadPLUgeneral', 'PLUNum', PLUNum);
};

/**
 * @typedef {Object} DailyReceivedSalesAmountsByOperatorRes
 * @property {number} OperNum Symbols from 1 to 20 corresponding to operator's number
 * @property {number} AmountPayment Up to 11 symbols for amount received from sales change by cash
 * @property {number} AmountPaymentOthers Up to 11 symbols for amount received from sales change by others 
payment
 */

/**
 * Read the amounts received from sales by type of payment and specified operator.
 * @param {number} OperNum Symbols from 1 to 20 corresponding to operator's 
number
 * @return {DailyReceivedSalesAmountsByOperatorRes}
 */
Tremol.FP.prototype.ReadDailyReceivedSalesAmountsByOperator = function (OperNum) {
	return this.do('ReadDailyReceivedSalesAmountsByOperator', 'OperNum', OperNum);
};

/**
 * Closes the non-fiscal receipt.
 */
Tremol.FP.prototype.CloseNonFiscReceipt = function () {
	return this.do('CloseNonFiscReceipt');
};

/**
 * Print a brief FM report by initial and end FM report number.
 * @param {number} StartNum 4 symbols for the initial FM report number included in report, format ####
 * @param {number} EndNum 4 symbols for the final FM report number included in report, format ####
 */
Tremol.FP.prototype.PrintBriefFMReportByNum = function (StartNum, EndNum) {
	return this.do('PrintBriefFMReportByNum', 'StartNum', StartNum, 'EndNum', EndNum);
};

/**
 * Read Electronic Journal report with all documents.
 */
Tremol.FP.prototype.ReadEJ = function () {
	return this.do('ReadEJ');
};

/**
 * Registers the payment in the receipt with specified type of payment and amount received.
 * @param {Tremol.Enums.OptionPaymentType} OptionPaymentType 1 symbol with values  
 - '0' - Cash 
 - '1' - Card  
 - '2' - Voucher  
 - '3' - Credit 
 - '4' - Currency
 * @param {Tremol.Enums.OptionChange} OptionChange Default value is 0, 1 symbol with value: 
 - '0 - With Change 
 - '1' - Without Change
 * @param {number} Amount Up to 10 characters for received amount
 * @param {Tremol.Enums.OptionChangeType=} OptionChangeType 1 symbols with value: 
 - '0' - Change In Cash 
 - '1' - Same As The payment 
 - '2' - Change In Currency
 */
Tremol.FP.prototype.Payment = function (OptionPaymentType, OptionChange, Amount, OptionChangeType) {
	return this.do('Payment', 'OptionPaymentType', OptionPaymentType, 'OptionChange', OptionChange, 'Amount', Amount, 'OptionChangeType', OptionChangeType);
};

/**
 * Set data for the state department number and name
 * @param {number} Number 2 symbols department number in format ##
 * @param {string} Name 23 characters department name
 */
Tremol.FP.prototype.ProgDepartmentName = function (Number, Name) {
	return this.do('ProgDepartmentName', 'Number', Number, 'Name', Name);
};

/**
 * Program device's network IP address, subnet mask, gateway address, DNS address. To apply use - 4Eh / N - Save network settings
 * @param {Tremol.Enums.OptionAddressType} OptionAddressType 1 symbol with value: 
 - '2' - IP address 
 - '3' - Subnet Mask 
 - '4' - Gateway address 
 - '5' - DNS address
 * @param {string} DeviceAddress 15 symbols for the selected address
 */
Tremol.FP.prototype.SetDeviceTCP_Addresses = function (OptionAddressType, DeviceAddress) {
	return this.do('SetDeviceTCP_Addresses', 'OptionAddressType', OptionAddressType, 'DeviceAddress', DeviceAddress);
};

/**
 * @typedef {Object} LastDailyReportInfoRes
 * @property {Date} LastZDailyReportDate 10 symbols for last Z-report date in DD-MM-YYYY format
 * @property {number} LastZDailyReportNum Up to 4 symbols for the number of the last daily report
 * @property {number} LastRAMResetNum Up to 4 symbols for the number of the last RAM reset
 * @property {number} TotalReceiptCounter 6 symbols for total number of receipts in format ######
 * @property {Date} DateTimeLastFiscRec Date Time parameter in format: DD-MM-YYYY HH:MM
 * @property {string} EJNum Up to 2 symbols for number of EJ
 * @property {number} FirstEJZreport Up to 4 symbols for first EJ Z-report number
 * @property {number} LastEJZreport Up to 4 symbols for last EJ Z-report number
 */

/**
 * Read date and number of last Z-report and last RAM reset event.
 * @return {LastDailyReportInfoRes}
 */
Tremol.FP.prototype.ReadLastDailyReportInfo = function () {
	return this.do('ReadLastDailyReportInfo');
};

/**
 * Provides information about sending of Z report to server automatically after Z report or not.
 * @return {Tremol.Enums.OptionSendAfterZ}
 */
Tremol.FP.prototype.ReadECRprofileZreportSending = function () {
	return this.do('ReadECRprofileZreportSending');
};

/**
 * Print a free text. The command can be executed only if receipt is opened (Fiscal receipt or Non-fical receipt). In the beginning and in the end of line symbol '#' is printed.
 * @param {string} Text TextLength-2 symbols
 */
Tremol.FP.prototype.PrintText = function (Text) {
	return this.do('PrintText', 'Text', Text);
};

/**
 * Prints an operator's report for a specified operator (0 = all operators) with or without zeroing ('Z' or 'X'). When a 'Z' value is specified the report should include all operators.
 * @param {Tremol.Enums.OptionZeroing} OptionZeroing with following values: 
 - 'Z' - Zeroing 
 - 'X' - Without zeroing
 * @param {number} Number Symbols from 0 to 20corresponding to operator's number 
,0 for all operators
 */
Tremol.FP.prototype.PrintOperatorReport = function (OptionZeroing, Number) {
	return this.do('PrintOperatorReport', 'OptionZeroing', OptionZeroing, 'Number', Number);
};

/**
 * @typedef {Object} StatusRes
 * @property {boolean} FM_Read_only FM Read only
 * @property {boolean} Power_down_in_opened_fiscal_receipt Power down in opened fiscal receipt
 * @property {boolean} Printer_not_ready_overheat Printer not ready - overheat
 * @property {boolean} DateTime_not_set DateTime not set
 * @property {boolean} DateTime_wrong DateTime wrong
 * @property {boolean} RAM_reset RAM reset
 * @property {boolean} Hardware_clock_error Hardware clock error
 * @property {boolean} Printer_not_ready_no_paper Printer not ready - no paper
 * @property {boolean} Reports_registers_Overflow Reports registers Overflow
 * @property {boolean} Blocking_after_24_hours_without_report Blocking after 24 hours without report
 * @property {boolean} Daily_report_is_not_zeroed Daily report is not zeroed
 * @property {boolean} Article_report_is_not_zeroed Article report is not zeroed
 * @property {boolean} Operator_report_is_not_zeroed Operator report is not zeroed
 * @property {boolean} Non_printed_copy Non-printed copy
 * @property {boolean} Opened_Non_fiscal_Receipt Opened Non-fiscal Receipt
 * @property {boolean} Opened_Fiscal_Receipt Opened Fiscal Receipt
 * @property {boolean} fiscal_receipt_type_1 fiscal receipt type 1
 * @property {boolean} fiscal_receipt_type_2 fiscal receipt type 2
 * @property {boolean} fiscal_receipt_type_3 fiscal receipt type 3
 * @property {boolean} SD_card_near_full SD card near full
 * @property {boolean} SD_card_full SD card full
 * @property {boolean} No_FM_module No FM module
 * @property {boolean} FM_error FM error
 * @property {boolean} FM_full FM full
 * @property {boolean} FM_near_full FM near full
 * @property {boolean} Decimal_point Decimal point (1=fract, 0=whole)
 * @property {boolean} FM_fiscalized FM fiscalized
 * @property {boolean} FM_produced FM produced
 * @property {boolean} Printer_automatic_cutting Printer: automatic cutting
 * @property {boolean} External_display_transparent_display External display: transparent display
 * @property {boolean} Missing_display Missing display
 * @property {boolean} Drawer_automatic_opening Drawer: automatic opening
 * @property {boolean} Customer_logo_included_in_the_receipt Customer logo included in the receipt
 * @property {boolean} Blocking_after_10_days_without_communication Blocking after 10 days without communication
 * @property {boolean} Service_jumper Service jumper
 * @property {boolean} Missing_certificates Missing certificates
 * @property {boolean} Wrong_SD_card Wrong SD card
 * @property {boolean} Deregistered Deregistered
 * @property {boolean} No_SIM_card No SIM card
 * @property {boolean} No_GPRS_Modem No GPRS Modem
 * @property {boolean} No_mobile_operator No mobile operator
 * @property {boolean} No_GPRS_service No GPRS service
 * @property {boolean} Near_end_of_paper Near end of paper
 * @property {boolean} CM_error CM error
 */

/**
 * Provides detailed 7-byte information about the current status of the fiscal device.
 * @return {StatusRes}
 */
Tremol.FP.prototype.ReadStatus = function () {
	return this.do('ReadStatus');
};

/**
 * @typedef {Object} DepartmentNameRes
 * @property {number} Number 2 symbols department number in format ##
 * @property {string} Name 23 characters department name
 */

/**
 * Read data for the state department number and name
 * @param {number} Number 2 symbols department number in format ##
 * @return {DepartmentNameRes}
 */
Tremol.FP.prototype.ReadDepartmentName = function (Number) {
	return this.do('ReadDepartmentName', 'Number', Number);
};

/**
 * Opens a fiscal receipt assigned to the specified operator
 * @param {number} OperNum Symbol from 1 to 20 corresponding to operator's number
 * @param {string} OperPass 6 symbols for operator's password
 * @param {Tremol.Enums.OptionPrintType} OptionPrintType 1 symbol with value 
 - '0' - Step by step printing 
 - '2' - Postponed printing
 */
Tremol.FP.prototype.OpenReceipt = function (OperNum, OperPass, OptionPrintType) {
	return this.do('OpenReceipt', 'OperNum', OperNum, 'OperPass', OperPass, 'OptionPrintType', OptionPrintType);
};

/**
 * Sets the date and time and prints out the current values.
 * @param {Date} DateTime Date Time parameter in format: DD-MM-YY HH:MM:SS
 */
Tremol.FP.prototype.SetDateTime = function (DateTime) {
	return this.do('SetDateTime', 'DateTime', DateTime);
};

/**
 * Stores a block containing the number format into the fiscal memory. Print the current status on the printer.
 * @param {string} Password 6-symbols string
 * @param {Tremol.Enums.OptionDecimalPointPosition} OptionDecimalPointPosition 1 symbol with values: 
 - '0'- Whole numbers 
 - '2' - Fractions
 */
Tremol.FP.prototype.ProgDecimalPointPosition = function (Password, OptionDecimalPointPosition) {
	return this.do('ProgDecimalPointPosition', 'Password', Password, 'OptionDecimalPointPosition', OptionDecimalPointPosition);
};

/**
 * @typedef {Object} TotalFiscalSumsRes
 * @property {string} SumSalesTurnover 14 s. for total grand sum of sales turnover from fiscal registration
 * @property {string} SumSalesVAT 14 s. for total VAT sum of sales from fiscal registration
 */

/**
 * Provides information about the total fiscal accumulative sums from sales
 * @return {TotalFiscalSumsRes}
 */
Tremol.FP.prototype.ReadTotalFiscalSums = function () {
	return this.do('ReadTotalFiscalSums');
};

/**
 * @typedef {Object} PLUpriceRes
 * @property {number} PLUNum 5 symbols for article number with leading zeroes in format #####
 * @property {number} Price 1..10 symbols for article price
 * @property {Tremol.Enums.OptionPrice} OptionPrice 1 byte for Price flag with next value: 
 - '0'- Free price is disable valid only programmed price 
 - '1'- Free price is enable 
 - '2'- Limited price
 */

/**
 * Provides information about the price and price type of the specified article.
 * @param {number} PLUNum 5 symbols for article number with leading zeroes in format: #####
 * @return {PLUpriceRes}
 */
Tremol.FP.prototype.ReadPLUprice = function (PLUNum) {
	return this.do('ReadPLUprice', 'PLUNum', PLUNum);
};

/**
 * @typedef {Object} DailyReturnedAmountsRes
 * @property {number} OperNum Symbols from 1 to 20 corresponding to operator's number
 * @property {number} AmountPayment Up to 11 symbols for amount received from sales by cash
 * @property {number} AmountPaymentOthers Up to 11 symbols for amount received from sales by others payment
 */

/**
 * Read information about the amounts returned
 * @param {number} OperNum Symbols from 1 to 20 corresponding to operator's 
number
 * @return {DailyReturnedAmountsRes}
 */
Tremol.FP.prototype.ReadDailyReturnedAmounts = function (OperNum) {
	return this.do('ReadDailyReturnedAmounts', 'OperNum', OperNum);
};

/**
 * @typedef {Object} OperatorNamePasswordRes
 * @property {number} Number Symbol from 1 to 20 corresponding to the number of operator
 * @property {string} Name 20 symbols for operator's name
 * @property {string} Password 4 symbols for operator's password
 */

/**
 * Provides information about an operator's name and password.
 * @param {number} Number Symbol from 1 to 20 corresponding to the number of operator
 * @return {OperatorNamePasswordRes}
 */
Tremol.FP.prototype.ReadOperatorNamePassword = function (Number) {
	return this.do('ReadOperatorNamePassword', 'Number', Number);
};

/**
 * @typedef {Object} DailyCountersByOperatorRes
 * @property {number} OperNum Symbols from 1 to 20 corresponding to operator's number
 * @property {number} WorkOperatorsCounter Up to 5 symbols for number of the work operators
 * @property {Date} LastOperatorReportDateTime 16 symbols for date and time of the last operator's report in 
format DD-MM-YYYY HH:MM
 */

/**
 * Read the last operator's report number and date and time.
 * @param {number} OperNum Symbols from 1 to 20 corresponding to 
operator's number
 * @return {DailyCountersByOperatorRes}
 */
Tremol.FP.prototype.ReadDailyCountersByOperator = function (OperNum) {
	return this.do('ReadDailyCountersByOperator', 'OperNum', OperNum);
};

/**
 * @typedef {Object} PaymentsRes
 * @property {string} NamePaym0 10 symbols for type 0 of payment name
 * @property {string} NamePaym1 10 symbols for type 1 of payment name
 * @property {string} NamePaym2 10 symbols for type 2 of payment name
 * @property {string} NamePaym3 10 symbols for type 3 of payment name
 */

/**
 * Provides information about all programmed payment types.
 * @return {PaymentsRes}
 */
Tremol.FP.prototype.ReadPayments = function () {
	return this.do('ReadPayments');
};

/**
 * Program the name of the payment types.
 * @param {Tremol.Enums.OptionPaymentNum} OptionPaymentNum 1 symbol for payment type: 
 - '0' - Payment 0 
 - '1' - Payment 1 
 - '2' - Payment 2 
 - '3' - Payment 3 
 - '4' - Payment 4
 * @param {string} Name 10 symbols for payment type name
 * @param {number=} Rate 10 symbols for exchange rate in format: ####.#####  
of the 5
th
 payment type.
 */
Tremol.FP.prototype.ProgPayment = function (OptionPaymentNum, Name, Rate) {
	return this.do('ProgPayment', 'OptionPaymentNum', OptionPaymentNum, 'Name', Name, 'Rate', Rate);
};

/**
 * Prints out a diagnostic receipt.
 */
Tremol.FP.prototype.PrintDiagnostics = function () {
	return this.do('PrintDiagnostics');
};

/**
 * Program the contents of a footer lines.
 * @param {Tremol.Enums.OptionFooterLine} OptionFooterLine 2 symbol with value: 
-'F1' - Footer 1 
-'F2' - Footer 2 
-'F3' - Footer 3
 * @param {string} FooterText TextLength symbols for footer line
 */
Tremol.FP.prototype.ProgFooter = function (OptionFooterLine, FooterText) {
	return this.do('ProgFooter', 'OptionFooterLine', OptionFooterLine, 'FooterText', FooterText);
};

/**
 * Print a copy of the last receipt document issued
 */
Tremol.FP.prototype.PrintLastReceiptDuplicate = function () {
	return this.do('PrintLastReceiptDuplicate');
};

/**
 * Program device's GPRS password. To apply use - SaveNetworkSettings()
 * @param {number} PassLength Up to 3 symbols for the GPRS password len
 * @param {string} Password Up to 100 symbols for the device's GPRS password
 */
Tremol.FP.prototype.SetGPRS_Password = function (PassLength, Password) {
	return this.do('SetGPRS_Password', 'PassLength', PassLength, 'Password', Password);
};

/**
 * Restore default parameters of the device.
 * @param {string} Password 6-symbols string
 */
Tremol.FP.prototype.SoftwareReset = function (Password) {
	return this.do('SoftwareReset', 'Password', Password);
};

/**
 * @typedef {Object} TCP_PasswordRes
 * @property {number} PassLength (Length) Up to 3 symbols for the password length
 * @property {string} Password Up to 100 symbols for the TCP password
 */

/**
 * Provides information about device's TCP password.
 * @return {TCP_PasswordRes}
 */
Tremol.FP.prototype.ReadTCP_Password = function () {
	return this.do('ReadTCP_Password');
};

/**
 * Stores a block containing the values of the VAT rates into the fiscal memory. Print the values on the printer.
 * @param {string} Password 6 symbols string
 * @param {number} VATrateC Value of VAT rate C from 6 symbols in format ##.##
 * @param {number} VATrateD Value of VAT rate D from 6 symbols in format ##.##
 * @param {number} VATrateE Value of VAT rate E from 6 symbols in format ##.##
 * @param {number} VATrateF Value of VAT rate F from 6 symbols in format ##.##
 * @param {number} VATrateG Value of VAT rate G from 6 symbols in format ##.##
 * @param {number} VATrateH Value of VAT rate H from 6 symbols in format ##.##
 */
Tremol.FP.prototype.ProgVATrates = function (Password, VATrateC, VATrateD, VATrateE, VATrateF, VATrateG, VATrateH) {
	return this.do('ProgVATrates', 'Password', Password, 'VATrateC', VATrateC, 'VATrateD', VATrateD, 'VATrateE', VATrateE, 'VATrateF', VATrateF, 'VATrateG', VATrateG, 'VATrateH', VATrateH);
};

/**
 * Program device's Bluetooth module to be enabled or disabled.
 * @param {Tremol.Enums.OptionBTstatus} OptionBTstatus 1 symbol with value: 
 - '0' - Disabled 
 - '1' - Enabled
 */
Tremol.FP.prototype.SetBluetooth_Status = function (OptionBTstatus) {
	return this.do('SetBluetooth_Status', 'OptionBTstatus', OptionBTstatus);
};

/**
 * Read Electronic Journal Report from Report initial date to report Final date.
 * @param {Date} StartRepFromDate 6 symbols for initial date in the DDMMYY format
 * @param {Date} EndRepFromDate 6 symbols for final date in the DDMMYY format
 */
Tremol.FP.prototype.ReadEJByDate = function (StartRepFromDate, EndRepFromDate) {
	return this.do('ReadEJByDate', 'StartRepFromDate', StartRepFromDate, 'EndRepFromDate', EndRepFromDate);
};

/**
 * @typedef {Object} PLUbarcodeRes
 * @property {number} PLUNum 5 symbols for article number with leading zeroes in format #####
 * @property {string} Barcode 13 symbols for article barcode
 */

/**
 * Provides information about the barcode of the specified article.
 * @param {number} PLUNum 5 symbols for article number with leading zeroes in format: #####
 * @return {PLUbarcodeRes}
 */
Tremol.FP.prototype.ReadPLUbarcode = function (PLUNum) {
	return this.do('ReadPLUbarcode', 'PLUNum', PLUNum);
};

/**
 * @typedef {Object} ServerPasswordECRSRes
 * @property {number} ParamLength Up to 2 symbols for parameter length
 * @property {string} ServerPassword Up to 64 symbols for server password
 */

/**
 * Provides information about the ECR's password
 * @return {ServerPasswordECRSRes}
 */
Tremol.FP.prototype.ReadServerPasswordECRS = function () {
	return this.do('ReadServerPasswordECRS');
};

/**
 * Set data for the state department number from the internal FD database.
 * @param {number} Number 2 symbols department number in format ##
 * @param {string} Name 23 characters department name
 * @param {Tremol.Enums.OptionVATClass} OptionVATClass 1 character for article VAT Class: 
 - 'A' - VAT Class A 
 - 'B' - VAT Class B 
 - 'C' - VAT Class C 
 - 'D' - VAT Class D 
 - 'E' - VAT Class E 
 - 'F' - VAT Class F 
 - 'G' - VAT Class G 
 - 'H' - VAT Class H
 * @param {number} Price Up to 10 symbols for department price
 * @param {string} FlagsPrice 1 symbol with value: 
Flags.7=1 
Flags.6=0 
Flags.5=0 
Flags.4=0 
Flags.3=1 Yes, Flags.3=0 No (Fractional quantity disabled) 
Flags.2=1 Yes, Flags.2=0 No (Single Transaction) 
Flags.1=1 Yes, Flags.1=0 No (Free price limited) 
Flags.0=1 Yes, Flags.0=0 No (Free price enabled)
 */
Tremol.FP.prototype.ProgDepartment = function (Number, Name, OptionVATClass, Price, FlagsPrice) {
	return this.do('ProgDepartment', 'Number', Number, 'Name', Name, 'OptionVATClass', OptionVATClass, 'Price', Price, 'FlagsPrice', FlagsPrice);
};

/**
 * Print or store Electronic Journal Report from by number of Z report blocks.
 * @param {number} StartZNum 4 symbols for initial number report in format ####
 * @param {number} EndZNum 4 symbols for final number report in format ####
 */
Tremol.FP.prototype.PrintEJByZBlocks = function (StartZNum, EndZNum) {
	return this.do('PrintEJByZBlocks', 'StartZNum', StartZNum, 'EndZNum', EndZNum);
};

/**
 * Sets device's idle timeout setting. Set timeout for closing the connection if there is an inactivity. Maximal value - 7200, minimal value 1. 0 is for never close the connection. This option can be used only if the device has LAN or WiFi. To apply use - 4Eh / N - Save network settings
 * @param {number} IdleTimeout 4 symbols for Idle timeout in format ####
 */
Tremol.FP.prototype.SetIdle_Timeout = function (IdleTimeout) {
	return this.do('SetIdle_Timeout', 'IdleTimeout', IdleTimeout);
};

/**
 * Read device TCP Auto Start status
 * @return {Tremol.Enums.OptionTCPAutoStart}
 */
Tremol.FP.prototype.ReadTCP_AutoStartStatus = function () {
	return this.do('ReadTCP_AutoStartStatus');
};

/**
 * Program the language of the device
 * @param {Tremol.Enums.OptionLanguage} OptionLanguage 1 symbol with value: 
 - '0' - Albanian 
 - '1' - Serbian 
 - '2' - English
 */
Tremol.FP.prototype.ProgramTempLanguage = function (OptionLanguage) {
	return this.do('ProgramTempLanguage', 'OptionLanguage', OptionLanguage);
};

/**
 * Prints the programmed graphical logo with the stated number.
 * @param {number} Number Number of logo to be printed. If missing prints logo with number 0
 */
Tremol.FP.prototype.PrintLogo = function (Number) {
	return this.do('PrintLogo', 'Number', Number);
};

/**
 * Printing Electronic Journal Report from Report initial date to report Final date.
 * @param {Date} StartRepFromDate 6 symbols for initial date in the DDMMYY format
 * @param {Date} EndRepFromDate 6 symbols for final date in the DDMMYY format
 */
Tremol.FP.prototype.PrintEJByDate = function (StartRepFromDate, EndRepFromDate) {
	return this.do('PrintEJByDate', 'StartRepFromDate', StartRepFromDate, 'EndRepFromDate', EndRepFromDate);
};

/**
 * @typedef {Object} DailyGeneralRegistersByOperatorRes
 * @property {number} OperNum Symbols from 1 to 20 corresponding to operator's number
 * @property {number} FiscalReciept Up to 5 symbols for daily number of fiscal receipts
 * @property {number} DiscountsNum Up to 5 symbols for number of discounts
 * @property {number} DiscountsAmount Up to 11 symbols for accumulated amount of discounts
 * @property {number} AdditionsNum Up to 5 symbols for number of additions
 * @property {number} AdditionsAmount Up to 11 symbols for accumulated amount of additions
 * @property {number} RefundNum Up to 5 symbols for number of refunds
 * @property {number} RefundAmount Up to 11 symbols for accumulated amount of refunds
 */

/**
 * Read the total number of customers, discounts, additions, corrections and accumulated amounts by specified operator.
 * @param {number} OperNum Symbols from 1 to 20 corresponding to operator's number
 * @return {DailyGeneralRegistersByOperatorRes}
 */
Tremol.FP.prototype.ReadDailyGeneralRegistersByOperator = function (OperNum) {
	return this.do('ReadDailyGeneralRegistersByOperator', 'OperNum', OperNum);
};

/**
 * @typedef {Object} GPRS_PasswordRes
 * @property {number} PassLength (Length) Up to 3 symbols for the GPRS password length
 * @property {string} Password Up to 100 symbols for the device's GPRS password
 */

/**
 * Provides information about device's GPRS password.
 * @return {GPRS_PasswordRes}
 */
Tremol.FP.prototype.ReadGPRS_Password = function () {
	return this.do('ReadGPRS_Password');
};

/**
 * Depending on the parameter prints:   daily fiscal report with zeroing and fiscal memory record, preceded by Electronic Journal report print ('Z');  daily fiscal report without zeroing ('X');
 * @param {Tremol.Enums.OptionZeroing} OptionZeroing 1 character with following values: 
 - 'Z' - Zeroing 
 - 'X' - Without zeroing
 */
Tremol.FP.prototype.PrintDailyReport = function (OptionZeroing) {
	return this.do('PrintDailyReport', 'OptionZeroing', OptionZeroing);
};

/**
 * Close the taxi fiscal receipt.
 * @param {number} TAXIcount Symbols from 1 to 16 corresponding to taxi counter
 */
Tremol.FP.prototype.CloseTaxiReceipt = function (TAXIcount) {
	return this.do('CloseTaxiReceipt', 'TAXIcount', TAXIcount);
};

/**
 * Programs the external display.
 * @param {string} Password A 6-symbol string
 */
Tremol.FP.prototype.ProgExtDisplay = function (Password) {
	return this.do('ProgExtDisplay', 'Password', Password);
};

/**
 * @typedef {Object} FooterRes
 * @property {Tremol.Enums.OptionFooterLine} OptionFooterLine (Line Number)1 symbol with value: 
 - 'F1' - Footer 1 
 - 'F2' - Footer 2 
 - 'F3' - Footer 3
 * @property {string} FooterText TextLength symbols for footer line
 */

/**
 * Provides the content of the footer lines.
 * @param {Tremol.Enums.OptionFooterLine} OptionFooterLine 1 symbol with value: 
 - 'F1' - Footer 1 
 - 'F2' - Footer 2 
 - 'F3' - Footer 3
 * @return {FooterRes}
 */
Tremol.FP.prototype.ReadFooter = function (OptionFooterLine) {
	return this.do('ReadFooter', 'OptionFooterLine', OptionFooterLine);
};

/**
 * Paying the exact amount in cash and close the fiscal receipt.
 * @param {number} TAXIcount Symbols from 1 to 16 corresponding to taxi counter
 */
Tremol.FP.prototype.CashPayCloseTaxiReceipt = function (TAXIcount) {
	return this.do('CashPayCloseTaxiReceipt', 'TAXIcount', TAXIcount);
};

/**
 * Print or store Electronic Journal Report from by number of Z report blocks of current receipt.
 * @param {number} StartZNum 4 symbols for initial number report in format ####
 * @param {number} EndZNum 4 symbols for final number report in format ####
 */
Tremol.FP.prototype.PrintEJByZBlocksWithoutReceipts = function (StartZNum, EndZNum) {
	return this.do('PrintEJByZBlocksWithoutReceipts', 'StartZNum', StartZNum, 'EndZNum', EndZNum);
};

/**
 * Opens a non-fiscal receipt assigned to the specified operator
 * @param {number} OperNum Symbols from '1' to '20' corresponding to operator's number
 * @param {string} OperPass 4 symbols for operator's password
 */
Tremol.FP.prototype.OpenNonFiscalReceipt = function (OperNum, OperPass) {
	return this.do('OpenNonFiscalReceipt', 'OperNum', OperNum, 'OperPass', OperPass);
};

/**
 * Provides information about active profile date - date from which the account is valid or date from which we return to account 1 in case of mReset.
 * @return {Date}
 */
Tremol.FP.prototype.ReadECRprofileActiveDate = function () {
	return this.do('ReadECRprofileActiveDate');
};

/**
 * Calculate the subtotal amount with printing and display visualization options. Provide information about values of the calculated amounts. If a percent or value discount/addition has been specified the subtotal and the discount/addition value will be printed regardless the parameter for printing.
 * @param {Tremol.Enums.OptionPrinting} OptionPrinting 1 symbol with value: 
 - '1' - Yes 
 - '0' - No
 * @param {Tremol.Enums.OptionDisplay} OptionDisplay 1 symbol with value: 
 - '1' - Yes 
 - '0' - No
 * @param {number=} DiscAddV Up to 8 symbols for the value of the 
discount/addition. Use minus sign '-' for discount
 * @param {number=} DiscAddP Up to 7 symbols for the percentage value of the 
discount/addition. Use minus sign '-' for discount
 * @return {number}
 */
Tremol.FP.prototype.Subtotal = function (OptionPrinting, OptionDisplay, DiscAddV, DiscAddP) {
	return this.do('Subtotal', 'OptionPrinting', OptionPrinting, 'OptionDisplay', OptionDisplay, 'DiscAddV', DiscAddV, 'DiscAddP', DiscAddP);
};

/**
 * @typedef {Object} DailyRARes
 * @property {number} AmountPayment Up to 11 symbols for RA amounts
 * @property {number} NumRA Up to 5 symbols for the total number of operations
 */

/**
 * Provides information about the RA amounts by type of payment and the total number of operations.
 * @return {DailyRARes}
 */
Tremol.FP.prototype.ReadDailyRA = function () {
	return this.do('ReadDailyRA');
};

/**
 * @typedef {Object} GeneralDailyRegistersRes
 * @property {number} FiscalReciept 1..5 symbols for daily number of fiscal receipts
 * @property {number} DiscountsNum Up to 5 symbols for number of discounts
 * @property {number} DiscountsAmount Up to 11 symbols for accumulated amount of discounts
 * @property {number} AdditionsNum Up to 5 symbols for number of additions
 * @property {number} AdditionsAmount Up to 11 symbols for accumulated amount of additions
 * @property {number} RefundNum Up to 5 symbols for number of refunds
 * @property {number} RefundAmount Up to 11 symbols for accumulated amount of refund operation
 */

/**
 * Provides information about the number of customers (number of fiscal receipt issued), number of discounts, additions and corrections made and the accumulated amounts.
 * @return {GeneralDailyRegistersRes}
 */
Tremol.FP.prototype.ReadGeneralDailyRegisters = function () {
	return this.do('ReadGeneralDailyRegisters');
};

/**
 * Stores in the memory the graphic file under stated number. Prints information about loaded in the printer graphic files.
 * @param {string} LogoNumber 1 character value from '0' to '9' or '?'. The number sets the active logo 
number, and the '?' invokes only printing of information
 */
Tremol.FP.prototype.SetActiveLogo = function (LogoNumber) {
	return this.do('SetActiveLogo', 'LogoNumber', LogoNumber);
};

/**
 * Provide information about the display greeting message.
 * @return {string}
 */
Tremol.FP.prototype.ReadDisplayGreetingMessage = function () {
	return this.do('ReadDisplayGreetingMessage');
};

/**
 * Program ECRS password
 * @param {number} ParamLength Up to 2 symbols for parameter length
 * @param {string} ServerPassword Up to 64 symbols for server password
 */
Tremol.FP.prototype.SetServerPasswordECRS = function (ParamLength, ServerPassword) {
	return this.do('SetServerPasswordECRS', 'ParamLength', ParamLength, 'ServerPassword', ServerPassword);
};

/**
 * Select type of display
 * @return {Tremol.Enums.OptionExternalType}
 */
Tremol.FP.prototype.ReadExternalDisplay = function () {
	return this.do('ReadExternalDisplay');
};

/**
 * Providing information about if the device's Bluetooth module is enabled or disabled.
 * @return {Tremol.Enums.OptionBTstatus}
 */
Tremol.FP.prototype.ReadBluetooth_Status = function () {
	return this.do('ReadBluetooth_Status');
};

/**
 * Program device's GPRS user name. To apply use - SaveNetworkSettings()
 * @param {number} GPRS_Username_Len Up to 3 symbols for the username len
 * @param {string} Username Up to 100 symbols for the device's GPRS username
 */
Tremol.FP.prototype.SetGPRS_Username = function (GPRS_Username_Len, Username) {
	return this.do('SetGPRS_Username', 'GPRS_Username_Len', GPRS_Username_Len, 'Username', Username);
};

/**
 * @typedef {Object} TaxiServiceGeneralRes
 * @property {number} ServiceNum 2 symbols for service number with leading zeroes in format: ##
 * @property {string} ServiceNameAL 30 symbols for service name in Albanian
 * @property {Tremol.Enums.OptionVATClass} OptionVATClass 1 character for article VAT Class: 
 - 'A' - VAT Class A 
 - 'B' - VAT Class B 
 - 'C' - VAT Class C 
 - 'D' - VAT Class D 
 - 'E' - VAT Class E 
 - 'F' - VAT Class F 
 - 'G' - VAT Class G 
 - 'H' - VAT Class H
 * @property {number} TurnoverAmount Up to 11 symbols for taxi service turnover
 * @property {number} SoldQuantity Up to 11 symbols for Sales quantity of the taxi service
 */

/**
 * Provides information about the general registers of the specified.
 * @param {number} ServiceNum 2 symbols for service number: ##
 * @return {TaxiServiceGeneralRes}
 */
Tremol.FP.prototype.ReadTaxiServiceGeneral = function (ServiceNum) {
	return this.do('ReadTaxiServiceGeneral', 'ServiceNum', ServiceNum);
};

/**
 * Program the price for a certain article and specific name.
 * @param {number} PLUNum 5 symbols for article number in format: #####
 * @param {string} PLUNameAlbanian 32 symbols for Albanian PLU
 * @param {string} PLUNameSerbian 32 symbols for Serbian PLU
 * @param {string} PLUNameEnglish 32 symbols for English PLU
 */
Tremol.FP.prototype.ProgPLUNameDifferent = function (PLUNum, PLUNameAlbanian, PLUNameSerbian, PLUNameEnglish) {
	return this.do('ProgPLUNameDifferent', 'PLUNum', PLUNum, 'PLUNameAlbanian', PLUNameAlbanian, 'PLUNameSerbian', PLUNameSerbian, 'PLUNameEnglish', PLUNameEnglish);
};

/**
 * @typedef {Object} DeviceModuleSupportRes
 * @property {Tremol.Enums.OptionLAN} OptionLAN 1 symbol for LAN support 
 - '0' - No 
 - '1' - Yes
 * @property {Tremol.Enums.OptionWiFi} OptionWiFi 1 symbol for WiFi support 
 - '0' - No 
 - '1' - Yes
 * @property {Tremol.Enums.OptionGPRS} OptionGPRS 1 symbol for GPRS support 
 - '0' - No 
 - '1' - Yes 
BT (Bluetooth) 1 symbol for Bluetooth support 
 - '0' - No 
 - '1' - Yes
 * @property {Tremol.Enums.OptionBT} OptionBT (Bluetooth) 1 symbol for Bluetooth support 
 - '0' - No 
 - '1' - Yes
 */

/**
 * Provide an information about modules supported by the device.
 * @return {DeviceModuleSupportRes}
 */
Tremol.FP.prototype.ReadDeviceModuleSupport = function () {
	return this.do('ReadDeviceModuleSupport');
};

/**
 * @typedef {Object} WiFi_NetworkNameRes
 * @property {number} WiFiNameLength (Length) Up to 3 symbols for the WiFi name length
 * @property {string} WiFiNetworkName (Name) Up to 100 symbols for the device's WiFi network name
 */

/**
 * Read device's connected WiFi network name
 * @return {WiFi_NetworkNameRes}
 */
Tremol.FP.prototype.ReadWiFi_NetworkName = function () {
	return this.do('ReadWiFi_NetworkName');
};

/**
 * @typedef {Object} ParametersRes
 * @property {number} POSNum (POS Number) 4 symbols for number of POS in format ####
 * @property {Tremol.Enums.OptionPrintLogo} OptionPrintLogo (Print Logo) 1 symbol of value: 
 - '1' - Yes 
 - '0' - No
 * @property {Tremol.Enums.OptionAutoOpenDrawer} OptionAutoOpenDrawer (Auto Open Drawer) 1 symbol of value: 
 - '1' - Yes 
 - '0' - No
 * @property {Tremol.Enums.OptionAutoCut} OptionAutoCut (Auto Cut) 1 symbol of value: 
 - '1' - Yes 
 - '0' - No
 * @property {Tremol.Enums.OptionExternalDispManagement} OptionExternalDispManagement (External Display Management) 1 symbol of value: 
 - '1' - Manual 
 - '0' - Auto
 * @property {Tremol.Enums.OptionWorkOperatorCount} OptionWorkOperatorCount (Work Operator Count) 1 symbol of value: 
 - '1' - One 
 - '0' - More
 */

/**
 * Provides information about the programmed number of POS and the current values of the logo, cutting permission, display mode, enable/disable currency in receipt.
 * @return {ParametersRes}
 */
Tremol.FP.prototype.ReadParameters = function () {
	return this.do('ReadParameters');
};

/**
 * @typedef {Object} VersionRes
 * @property {string} Model Up to 50 symbols for Model name
 * @property {string} Version Up to 20 symbols for Version name and Check sum
 */

/**
 * Provides information about the device model and version.
 * @return {VersionRes}
 */
Tremol.FP.prototype.ReadVersion = function () {
	return this.do('ReadVersion');
};

/**
 *  Writes raw bytes to FP 
 * @param {Uint8Array} Bytes The bytes in BASE64 ecoded string to be written to FP
 */
Tremol.FP.prototype.RawWrite = function (Bytes) {
	return this.do('RawWrite', 'Bytes', Bytes);
};

/**
 * Paying the exact amount in cash and close the fiscal receipt.
 */
Tremol.FP.prototype.CashPayCloseReceipt = function () {
	return this.do('CashPayCloseReceipt');
};

/**
 * Program the contents of a Display Greeting message.
 * @param {string} DisplayGreetingText 20 symbols for Display greeting message
 */
Tremol.FP.prototype.ProgDisplayGreetingMessage = function (DisplayGreetingText) {
	return this.do('ProgDisplayGreetingMessage', 'DisplayGreetingText', DisplayGreetingText);
};

/**
 * @typedef {Object} DailyPORes
 * @property {number} AmountPayment Up to 11 symbols for PO amount by type of payment
 * @property {number} NumPO Up to 5 symbols for the total number of operations
 */

/**
 * Provides information about the PO amounts by type of payment and the total number of operations.
 * @return {DailyPORes}
 */
Tremol.FP.prototype.ReadDailyPO = function () {
	return this.do('ReadDailyPO');
};

/**
 * @typedef {Object} DepartmentOption1Res
 * @property {number} Number 2 symbols department number in format ##
 * @property {string} Name 23 characters department name
 * @property {Tremol.Enums.OptionVATClass} OptionVATClass 1 character for article VAT Class: 
 - 'A' - VAT Class A 
 - 'B' - VAT Class B 
 - 'C' - VAT Class C 
 - 'D' - VAT Class D 
 - 'E' - VAT Class E 
 - 'F' - VAT Class F 
 - 'G' - VAT Class G 
 - 'H' - VAT Class H
 * @property {number} Price Up to 10 symbols for department price
 * @property {string} FlagsPrice (Setting price, type of goods) 1 symbol with value: 
Flags.7=1 
Flags.6=0 
Flags.5=0 
Flags.4=0 
Flags.3=1 Yes, Flags.3=0 No (Fractional quantity disabled) 
Flags.2=1 Yes, Flags.2=0 No (Single Transaction) 
Flags.1=1 Yes, Flags.1=0 No (Free price limited) 
Flags.0=1 Yes, Flags.0=0 No (Free price enabled)
 * @property {number} Turnover Up to 11 symbols for accumulated turnover of the department
 * @property {number} SoldQuantity Up to 11 symbols for sold quantity of the department
 * @property {number} RefundAmount Up to 11 symbols for accumulated refund amount of the department
 * @property {number} RefundQTY Up to 11 symbols for accumulated refund quantity of department
 * @property {number} LastZReportNumber Up to 5 symbols for the number of last Z report in format #####
 * @property {Date} LastZReportDate 16 symbols for the date and hour in last Z report
 */

/**
 * Read data for the state department number from the internal FD database.
 * @param {number} Number 2 symbols department number in format ##
 * @return {DepartmentOption1Res}
 */
Tremol.FP.prototype.ReadDepartmentOption1 = function (Number) {
	return this.do('ReadDepartmentOption1', 'Number', Number);
};

/**
 * Store a brief FM report by initial and end date.
 * @param {Date} StartDate 6 symbols for initial date in the DDMMYY format
 * @param {Date} EndDate 6 symbols for final date in the DDMMYY format
 */
Tremol.FP.prototype.ReadBriefFMReportByDate = function (StartDate, EndDate) {
	return this.do('ReadBriefFMReportByDate', 'StartDate', StartDate, 'EndDate', EndDate);
};

/**
 * Storage a detailed FM report by initial and end date.
 * @param {Date} StartDate 6 symbols for initial date in the DDMMYY format
 * @param {Date} EndDate 6 symbols for final date in the DDMMYY format
 */
Tremol.FP.prototype.ReadDetailedFMReportByDate = function (StartDate, EndDate) {
	return this.do('ReadDetailedFMReportByDate', 'StartDate', StartDate, 'EndDate', EndDate);
};

/**
* Sends client definitions to the server for compatibillity.
*/
Tremol.FP.prototype.ApplyClientLibraryDefinitions = function () {
	var defs = '<Defs><ServerStartupSettings>   <Encoding CodePage="1250" EncodingName="Central European (Windows)" />   <GenerationTimeStamp>2207281737</GenerationTimeStamp>   <SignalFD>0</SignalFD>   <SilentFindDevice>0</SilentFindDevice>   <EM>0</EM> </ServerStartupSettings><Command Name="ReadGPRS_Signal" CmdByte="0x4E"><FPOperation>Provides information about device\'s GPRS signal.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="G" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'G\'><;><\'S\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="G" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Res Name="GPRS_Signal" Value="" Type="Text" MaxLen="3"><Desc>(Signal) 3 symbols for the GPRS signal</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'G\'><;><\'S\'><;><GPRS_Signal[3]]]></ResFormatRaw></Response></Command><Command Name="PrintArticleReport" CmdByte="0x7E"><FPOperation>Prints an article report with or without zeroing (\'Z\' or \'X\').</FPOperation><Args><Arg Name="OptionZeroing" Value="" Type="Option" MaxLen="1"><Options><Option Name="Without zeroing" Value="X" /><Option Name="Zeroing" Value="Z" /></Options><Desc>with following values:   - \'Z\' - Zeroing   - \'X\' - Without zeroing</Desc></Arg><ArgsFormatRaw><![CDATA[ <OptionZeroing[1]> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadDecimalPoint" CmdByte="0x63"><FPOperation>Provides information about the current (the last value stored into the FM) decimal point format.</FPOperation><Response ACK="false"><Res Name="OptionDecimalPointPosition" Value="" Type="Option" MaxLen="1"><Options><Option Name="Fractions" Value="2" /><Option Name="Whole numbers" Value="0" /></Options><Desc>1 symbol with values:   - \'0\'- Whole numbers   - \'2\' - Fractions</Desc></Res><ResFormatRaw><![CDATA[<DecimalPointPosition[1]>]]></ResFormatRaw></Response></Command><Command Name="ProgParameters" CmdByte="0x45"><FPOperation>Programs the number of POS, printing of logo, cash drawer opening, cutting permission, external display management mode, sending receipts, enable or disable currency in receipt and working operators counter.</FPOperation><Args><Arg Name="POSNum" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols for number of POS in format ####</Desc></Arg><Arg Name="OptionPrintLogo" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol of value:   - \'1\' - Yes   - \'0\' - No</Desc></Arg><Arg Name="OptionAutoOpenDrawer" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol of value:   - \'1\' - Yes   - \'0\' - No</Desc></Arg><Arg Name="OptionAutoCut" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol of value:   - \'1\' - Yes   - \'0\' - No</Desc></Arg><Arg Name="OptionExternalDispManagement" Value="" Type="Option" MaxLen="1"><Options><Option Name="Auto" Value="0" /><Option Name="Manual" Value="1" /></Options><Desc>1 symbol of value:   - \'1\' - Manual   - \'0\' - Auto</Desc></Arg><Arg Name="OptionWorkOperatorCount" Value="" Type="Option" MaxLen="1"><Options><Option Name="More" Value="0" /><Option Name="One" Value="1" /></Options><Desc>1 symbol of value:   - \'1\' - One   - \'0\' - More</Desc></Arg><ArgsFormatRaw><![CDATA[ <POSNum[4]> <;> <PrintLogo[1]> <;> <AutoOpenDrawer[1]> <;> <AutoCut[1]> <;> < ExternalDispManagement[1]> <;> <WorkOperatorCount[1]> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadDailySaleAmountsByVAT" CmdByte="0x6D"><FPOperation>Provides information about the accumulated amount by VAT group.</FPOperation><Response ACK="false"><Res Name="SalesAmountVATGr0" Value="" Type="Text" MaxLen="11"><Desc>Up to 11 symbols for the sales amount accumulated by VAT group A</Desc></Res><Res Name="SalesAmountVATGr1" Value="" Type="Text" MaxLen="11"><Desc>Up to 11 symbols for the sales amount accumulated by VAT group B</Desc></Res><Res Name="SalesAmountVATGr2" Value="" Type="Text" MaxLen="11"><Desc>Up to 11 symbols for the sales amount accumulated by VAT group C</Desc></Res><Res Name="SalesAmountVATGr3" Value="" Type="Text" MaxLen="1"><Desc>Up to 11 symbols for the sales amount accumulated by VAT group D</Desc></Res><Res Name="SalesAmountVATGr4" Value="" Type="Text" MaxLen="11"><Desc>Up to 11 symbols for the sales amount accumulated by VAT group E</Desc></Res><Res Name="SalesAmountVATGr5" Value="" Type="Text" MaxLen="11"><Desc>Up to 11 symbols for the sales amount accumulated by VAT group F</Desc></Res><Res Name="SalesAmountVATGr6" Value="" Type="Text" MaxLen="11"><Desc>Up to 11 symbols for the sales amount accumulated by VAT group G</Desc></Res><Res Name="SalesAmountVATGr7" Value="" Type="Text" MaxLen="1"><Desc>Up to 11 symbols for the sales amount accumulated by VAT group H</Desc></Res><ResFormatRaw><![CDATA[<SalesAmountVATGr0[11]> <;> <SalesAmountVATGr1[11]> <;> <SalesAmountVATGr2[11]> <;> <SalesAmountVATGr3[1]> <;><SalesAmountVATGr4[11]> <;> <SalesAmountVATGr5[11]> <;> <SalesAmountVATGr6[11]> <;> <SalesAmountVATGr7[1]> <;>]]></ResFormatRaw></Response></Command><Command Name="StartTest_Lan" CmdByte="0x4E"><FPOperation>Start LAN test on the device and print out the result</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'> <;> <\'T\'> <;> <\'T\'> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadDepartment" CmdByte="0x67"><FPOperation>Provides information for the programmed data, the turnover from the stated department number</FPOperation><Args><Arg Name="DepNum" Value="" Type="Decimal_with_format" MaxLen="2" Format="00"><Desc>2 symbols for deparment number in format: ##</Desc></Arg><ArgsFormatRaw><![CDATA[ <DepNum[2]> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="DepNum" Value="" Type="Decimal_with_format" MaxLen="2" Format="00"><Desc>2 symbols for department number in format ##</Desc></Res><Res Name="DepName" Value="" Type="Text" MaxLen="32"><Desc>34 symbols for department name</Desc></Res><Res Name="OptionVATClass" Value="" Type="Option" MaxLen="1"><Options><Option Name="VAT Class A" Value="A" /><Option Name="VAT Class B" Value="B" /><Option Name="VAT Class C" Value="C" /><Option Name="VAT Class D" Value="D" /><Option Name="VAT Class E" Value="E" /><Option Name="VAT Class F" Value="F" /><Option Name="VAT Class G" Value="G" /><Option Name="VAT Class H" Value="H" /></Options><Desc>1 character for VAT class attachment of the department:   - \'A\' - VAT Class A   - \'B\' - VAT Class B   - \'C\' - VAT Class C   - \'D\' - VAT Class D   - \'E\' - VAT Class E   - \'F\' - VAT Class F   - \'G\' - VAT Class G   - \'H\' - VAT Class H</Desc></Res><Res Name="Price" Value="" Type="Decimal" MaxLen="11"><Desc>1..11 symbols for Department price</Desc></Res><Res Name="FlagsPrice" Value="" Type="Flags" MaxLen="1"><Desc>(Setting price, single transaction, type of goods) 1 symbol with value:  Flags.7=1  Flags.6=0  Flags.5=0  Flags.4=0  Flags.3=1 Yes, Flags.3=0 No (Fractional quantity disabled)  Flags.2=1 Yes, Flags.2=0 No (Single Transaction)  Flags.1=1 Yes, Flags.1=0 No (Free price limited)  Flags.0=1 Yes, Flags.0=0 No (Free price enabled)</Desc></Res><Res Name="Turnover" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for accumulated turnover of the department</Desc></Res><Res Name="SoldQuantity" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for sold quantity of the department</Desc></Res><Res Name="RefundAmount" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for accumulated refund amount of the department</Desc></Res><Res Name="RefundQTY" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for accumulated refund quantity of department</Desc></Res><Res Name="LastZReportNumber" Value="" Type="Decimal_with_format" MaxLen="5" Format="00000"><Desc>Up to 5 symbols for the number of last Z report in format #####</Desc></Res><Res Name="LastZReportDate" Value="" Type="DateTime" MaxLen="10" Format="dd-MM-yyyy HH:mm"><Desc>16 symbols for the date and hour in last Z report</Desc></Res><ResFormatRaw><![CDATA[<DepNum[2]> <;> <DepName[32]> <;> <OptionVATClass[1]> <;> <Price[1..11]> <;> <FlagsPrice[1]> <;> <Turnover[1..11]> <;> <SoldQuantity[1..11]> <;> <RefundAmount[1..11]> <;> <RefundQTY[1..11]> <;> <LastZReportNumber[1..5]> <;> <LastZReportDate"DD-MM-YYYY HH:MM">]]></ResFormatRaw></Response></Command><Command Name="ReadLastReceiptNum" CmdByte="0x71"><FPOperation>Provides information about the number of the last issued receipt.</FPOperation><Response ACK="false"><Res Name="LastReceiptNum" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000 for the number of last issued fiscal receipt"><Desc>Up to 4 symbols in format #### for the number of last issued fiscal receipt</Desc></Res><ResFormatRaw><![CDATA[<LastReceiptNum[1..4]>]]></ResFormatRaw></Response></Command><Command Name="ProgPLUgeneral" CmdByte="0x4B"><FPOperation>Programs the general data for a certain article in the internal FD database. The price may have variable length, while the name field is fixed.</FPOperation><Args><Arg Name="PLUNum" Value="" Type="Text" MaxLen="5"><Desc>5 symbols for article number</Desc></Arg><Arg Name="Option" Value="1" Type="OptionHardcoded" MaxLen="1" /><Arg Name="PLUName" Value="" Type="Text" MaxLen="32"><Desc>32 symbols for article name</Desc></Arg><Arg Name="Price" Value="" Type="Decimal" MaxLen="10"><Desc>1 to 10 symbols for article price</Desc></Arg><Arg Name="FlagsPriceQty" Value="" Type="Flags" MaxLen="1"><Desc>1 symbols with value:  Flags.7=1  Flags.6=0  Flags.5=1 Yes, Flags.5=0 No (Fractional quantity disabled)  Flags.4=1 Yes, Flags.4=0 No (Single Transaction)  Flags.3=1 Yes, Flags.3=0 No (Allow negative quantity)  Flags.2=1 Yes, Flags.2=0 No (Monitoring quantity in stock)  Flags.1=1 Yes, Flags.1=0 No (Free price limited)  Flags.0=1 Yes, Flags.0=0 No (Free price enabled)</Desc></Arg><Arg Name="OptionVATClass" Value="" Type="Option" MaxLen="1"><Options><Option Name="VAT Class A" Value="A" /><Option Name="VAT Class B" Value="B" /><Option Name="VAT Class C" Value="C" /><Option Name="VAT Class D" Value="D" /><Option Name="VAT Class E" Value="E" /><Option Name="VAT Class F" Value="F" /><Option Name="VAT Class G" Value="G" /><Option Name="VAT Class H" Value="H" /></Options><Desc>1 character for article VAT Class:   - \'A\' - VAT Class A   - \'B\' - VAT Class B   - \'C\' - VAT Class C   - \'D\' - VAT Class D   - \'E\' - VAT Class E   - \'F\' - VAT Class F   - \'G\' - VAT Class G   - \'H\' - VAT Class H</Desc></Arg><Arg Name="BelongToDepNum" Value="" Type="Decimal_plus_80h" MaxLen="2"><Desc>BelongToDepNum + 80h, 1 symbol for article  department attachment, formed in the following manner:  BelongToDepNum[HEX] + 80h example: Dep01 = 81h, Dep02 = 82h …  Dep19 = 93h</Desc></Arg><Arg Name="AvailableQuantity" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for quantity in stock</Desc></Arg><Arg Name="Barcode" Value="" Type="Text" MaxLen="13"><Desc>13 symbols for barcode</Desc></Arg><ArgsFormatRaw><![CDATA[ <PLUNum[5]> <;> <Option[\'1\']> <;> <PLUName[32]> <;> <Price[1..10]> <;> <FlagsPriceQty[1]> <;> < OptionVATClass[1] ><;><BelongToDepNum[1..2]> <;> <AvailableQuantity[1..11]> <;> <Barcode[13]> ]]></ArgsFormatRaw></Args></Command><Command Name="ProgSymbolsPerLine" CmdByte="0x4F"><FPOperation>Program the number of symbols per line.</FPOperation><Args><Arg Name="Option1" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="Option2" Value="W" Type="OptionHardcoded" MaxLen="1" /><Arg Name="Password" Value="" Type="Text" MaxLen="6"><Desc>6 symbols for password</Desc></Arg><Arg Name="OptionLineSymbols" Value="" Type="Option" MaxLen="1"><Options><Option Name="Symbols per line 32" Value="0" /><Option Name="Symbols per line 48" Value="1" /></Options><Desc>1 symbol with value:   - \'0\' - Symbols per line 32   - \'1\' - Symbols per line 48</Desc></Arg><ArgsFormatRaw><![CDATA[ <Option1[\'P\']> <;><Option2[\'W\']><;> <Password[6]> <;> <LineSymbols[1]> ]]></ArgsFormatRaw></Args></Command><Command Name="PrintEJ" CmdByte="0x7C"><FPOperation>Print or store Electronic Journal report with all documents.</FPOperation><Args><Arg Name="" Value="J1" Type="OptionHardcoded" MaxLen="2" /><Arg Name="" Value="*" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'J1\'> <;> <\'*\'> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadUsedComModule" CmdByte="0x4E"><FPOperation>Provides information about the communication module, used for talking with the server</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="E" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'> <;> <\'S\'> <;> <\'E\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="E" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionCommunicationModule" Value="" Type="Option" MaxLen="1"><Options><Option Name="GSM" Value="0" /><Option Name="LAN" Value="1" /></Options><Desc>1 symbol with value:   - \'0\' - GSM   - \'1\' - LAN</Desc></Res><ResFormatRaw><![CDATA[<\'R\'> <;> <\'S\'> <;> <\'E\'> <;> <CommunicationModule[1]>]]></ResFormatRaw></Response></Command><Command Name="RestorePreviousHeader" CmdByte="0x53"><FPOperation>Restore previous header if current header is not saved into fiscal memory.</FPOperation><Args><Arg Name="" Value="0" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'0\'> ]]></ArgsFormatRaw></Args></Command><Command Name="CashDrawerOpen" CmdByte="0x2A"><FPOperation>Opens the cash drawer.</FPOperation></Command><Command Name="SetTCPpassword" CmdByte="0x4E"><FPOperation>Program device\'s TCP password. To apply use - 4Eh / N - Save network settings</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="1" Type="OptionHardcoded" MaxLen="1" /><Arg Name="PassLength" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for the password len</Desc></Arg><Arg Name="Password" Value="" Type="Text" MaxLen="100"><Desc>Up to 100 symbols for the TCP password</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'> <;> <\'Z\'> <;> <\'1\'> <;> <PassLength[1..3]> <;> <Password[100]> ]]></ArgsFormatRaw></Args></Command><Command Name="DisplayTextLines1and2" CmdByte="0x27"><FPOperation>Shows a 20-symbols text in the first line and last 20-symbols text in the second line of the external display lines.</FPOperation><Args><Arg Name="Text" Value="" Type="Text" MaxLen="40"><Desc>40 symbols text</Desc></Arg><ArgsFormatRaw><![CDATA[ <Text[40]> ]]></ArgsFormatRaw></Args></Command><Command Name="SellPLUFromFD_DB" CmdByte="0x32"><FPOperation>Register the sell with specified quantity of article from the internal FD database.</FPOperation><Args><Arg Name="OptionSign" Value="" Type="Option" MaxLen="1"><Options><Option Name="Correction" Value="-" /><Option Name="Sale" Value="+" /></Options><Desc>1 symbol with optional value:   - \'+\' -Sale   - \'-\' - Correction</Desc><Meta MinLen="1" Compulsory="true" NoSemiColumnSeparatorAfterIt="true" /></Arg><Arg Name="PLUNum" Value="" Type="Decimal_with_format" MaxLen="5" Format="00000"><Desc>5 symbols for PLU number of FD\'s database in format #####</Desc></Arg><Arg Name="Price" Value="" Type="Decimal" MaxLen="8"><Desc>Up to 10 symbols for sale price</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence="$" /></Arg><Arg Name="Quantity" Value="" Type="Decimal" MaxLen="10"><Desc>Up to 10 symbols for article\'s quantity sold</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence="*" /></Arg><Arg Name="DiscAddP" Value="" Type="Decimal" MaxLen="7"><Desc>Up to 7 for percentage of discount/addition. Use minus  sign \'-\' for discount</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence="," /></Arg><Arg Name="DiscAddV" Value="" Type="Decimal" MaxLen="8"><Desc>Up to 8 symbolsfor percentage of discount/addition.  Use minus sign \'-\' for discount</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence=":" /></Arg><ArgsFormatRaw><![CDATA[ <OptionSign[1]> <PLUNum[5]> {<\'$\'> <Price[1..8]>} {<\'*\'> <Quantity[1..10]>} {<\',\'> <DiscAddP[1..7]>} {<\':\'> <DiscAddV[1..8]>} ]]></ArgsFormatRaw></Args></Command><Command Name="ReadTempLanguage" CmdByte="0x4F"><FPOperation>Read temporary header language</FPOperation><Args><Arg Name="" Value="l" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'l\'> <;> <\'R\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="l" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionLanguage" Value="" Type="Option" MaxLen="1"><Options><Option Name="Albanian" Value="0" /><Option Name="English" Value="2" /><Option Name="Serbian" Value="1" /></Options><Desc>1 symbol with value:   - \'0\' - Albanian   - \'1\' - Serbian   - \'2\' - English</Desc></Res><ResFormatRaw><![CDATA[<\'l\'> <;> <\'R\'> <;> < Language [1]>]]></ResFormatRaw></Response></Command><Command Name="ReadDailyReturned" CmdByte="0x6E"><FPOperation>Provides information about the amounts returned as sales change.</FPOperation><Args><Arg Name="" Value="6" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'6\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="6" Type="OptionHardcoded" MaxLen="1" /><Res Name="AmountPayment" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for amount received from sales change by cash</Desc></Res><Res Name="AmountPaymentOthers" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for amount received from sales change by  others payment</Desc></Res><ResFormatRaw><![CDATA[<\'6\'> <;> <AmountPayment[1..11]> <;> <AmountPaymentOthers[1..11]>]]></ResFormatRaw></Response></Command><Command Name="ReadDateTime" CmdByte="0x68"><FPOperation>Provides information about the current date and time.</FPOperation><Response ACK="false"><Res Name="DateTime" Value="" Type="DateTime" MaxLen="10" Format="dd-MM-yyyy HH:mm"><Desc>Date Time parameter in format: DD-MM-YY [Space] HH:MM</Desc></Res><ResFormatRaw><![CDATA[<DateTime "DD-MM-YYYY HH:MM">]]></ResFormatRaw></Response></Command><Command Name="PayExactSum" CmdByte="0x35"><FPOperation>Register the payment in the receipt with specified type of payment and exact amount received.</FPOperation><Args><Arg Name="OptionPaymentType" Value="" Type="Option" MaxLen="1"><Options><Option Name="Card" Value="1" /><Option Name="Cash" Value="0" /><Option Name="Credit" Value="3" /><Option Name="Currency" Value="4" /><Option Name="Voucher" Value="2" /></Options><Desc>1 symbol with values    - \'0\' - Cash   - \'1\' - Card    - \'2\' - Voucher    - \'3\' - Credit   - \'4\' - Currency</Desc></Arg><Arg Name="reserved" Value="0" Type="OptionHardcoded" MaxLen="1" /><Arg Name="reserved" Value="&quot;" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <PaymentType[1]> <;> <reserved[\'0\']> <;><reserved[\'"\']> ]]></ArgsFormatRaw></Args></Command><Command Name="StartTest_WiFi" CmdByte="0x4E"><FPOperation>Start WiFi test on the device and print out the result</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="W" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'> <;> <\'W\'> <;> <\'T\'> ]]></ArgsFormatRaw></Args></Command><Command Name="SetDeviceMAC_Address" CmdByte="0x4E"><FPOperation>Provides information about TCP device MAC address</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="6" Type="OptionHardcoded" MaxLen="1" /><Arg Name="DeviceMAC" Value="" Type="Text" MaxLen="12"><Desc>12 symbols for device MAC</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'> <;> <\'T\'> <;> <\'6\'> <;> <DeviceMAC[12]> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadFMfreeRecords" CmdByte="0x74"><FPOperation>Read the number of the remaining free records for Z-report in the Fiscal Memory and check sum, resets, header, tax, sd card and registration changes of FM MCU flash memory.</FPOperation><Response ACK="false"><Res Name="FreeFMrecords" Value="" Type="Text" MaxLen="4"><Desc>4 symbols for the number of free records for Z-report in the FM  CS 4 symbols for FM MCU flash checksum</Desc></Res><Res Name="CS" Value="" Type="Text" MaxLen="4"><Desc>4 symbols for FM MCU flash checksum</Desc></Res><Res Name="FreeResets" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for resets in FM</Desc></Res><Res Name="FreeHeaderChanges" Value="" Type="Decimal" MaxLen="2"><Desc>Up to 2 symbols for headers changes in FM</Desc></Res><Res Name="FreeTaxChanges" Value="" Type="Decimal" MaxLen="2"><Desc>Up to 2 symbols for tax changes in FM</Desc></Res><Res Name="FreeSDchanges" Value="" Type="Decimal" MaxLen="2"><Desc>Up to 2 symbols for SD changes in FM</Desc></Res><Res Name="FreeRegistrationChanges" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for registration changes in FM</Desc></Res><ResFormatRaw><![CDATA[<FreeFMrecords[4]><;><CS[4]><;><FreeResets[1..3]> <;><FreeHeaderChanges[1..2]><;><FreeTaxChanges[1..2]><;><FreeSDchanges[1..2]> <;><FreeRegistrationChanges[1..3] >]]></ResFormatRaw></Response></Command><Command Name="ReadBluetooth_Password" CmdByte="0x4E"><FPOperation>Provides information about device\'s Bluetooth password.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="B" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'> <;> <\'B\'> <;> <\'P\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="B" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Res Name="PassLength" Value="" Type="Decimal" MaxLen="3"><Desc>(Length) Up to 3 symbols for the BT password length</Desc></Res><Res Name="Password" Value="" Type="Text" MaxLen="100"><Desc>Up to 100 symbols for the BT password</Desc></Res><ResFormatRaw><![CDATA[<\'R\'> <;> <\'B\'> <;> <\'P\'> <;> <PassLength[1..3]> <;> <Password[100]>]]></ResFormatRaw></Response></Command><Command Name="ReadEJFromReceiptToReceipt" CmdByte="0x7C"><FPOperation>Read Electronic Journal Report from receipt number to receipt number.</FPOperation><Args><Arg Name="" Value="J0" Type="OptionHardcoded" MaxLen="2" /><Arg Name="" Value="N" Type="OptionHardcoded" MaxLen="1" /><Arg Name="StartReceiptNum" Value="" Type="Decimal_with_format" MaxLen="6" Format="000000"><Desc>6 symbols for initial receipt number included in report in format ######</Desc></Arg><Arg Name="EndReceiptNum" Value="" Type="Decimal_with_format" MaxLen="6" Format="000000"><Desc>6 symbols for final receipt number included in report in format ######</Desc></Arg><ArgsFormatRaw><![CDATA[<\'J0\'><;><\'N\'><;><StartReceiptNum[6]><;><EndReceiptNum[6]> ]]></ArgsFormatRaw></Args><Response ACK="true" ACK_PLUS="true" /></Command><Command Name="SellPLUfromDep" CmdByte="0x34"><FPOperation>Register the sell of department.</FPOperation><Args><Arg Name="NamePLU" Value="" Type="Text" MaxLen="36"><Desc>36 symbols for name of sale. 34 symbols are printed on paper.</Desc></Arg><Arg Name="DepNum" Value="" Type="Decimal_plus_80h" MaxLen="2"><Desc>1 symbol for article department  attachment, formed in the following manner: DepNum[HEX] + 80h example:  Dep01 = 81h, Dep02 = 82h … Dep19 = 93h</Desc></Arg><Arg Name="Price" Value="" Type="Decimal" MaxLen="10"><Desc>Up to 10 symbols for article\'s price.</Desc></Arg><Arg Name="Quantity" Value="" Type="Decimal" MaxLen="10"><Desc>Up to 10 symbols for article\'s quantity sold</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence="*" /></Arg><Arg Name="DiscAddP" Value="" Type="Decimal" MaxLen="7"><Desc>Up to 7 for percentage of discount/addition. Use minus  sign \'-\' for discount</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence="," /></Arg><Arg Name="DiscAddV" Value="" Type="Decimal" MaxLen="8"><Desc>Up to 8 symbols for percentage of discount/addition.  Use minus sign \'-\' for discount</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence=":" /></Arg><ArgsFormatRaw><![CDATA[ <NamePLU[36]> <;> <DepNum[1..2]> <;> <Price[1..10]>{<\'*\'> <Quantity[1..10]>} {<\',\'> <DiscAddP[1..7]>} {<\':\'> <DiscAddV[1..8]>} ]]></ArgsFormatRaw></Args></Command><Command Name="PrintSpecialEventsFMreport" CmdByte="0x77"><FPOperation>Print whole special FM events report.</FPOperation></Command><Command Name="Read_IdleTimeout" CmdByte="0x4E"><FPOperation>Provides information about device\'s idle timeout. This timeout is for closing the connection if there is an inactivity. Maximal value - 7200, minimal value 1. 0 is for never close the connection. This option can be used only if the device has LAN or WiFi.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="I" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'> <;> <\'Z\'> <;> <\'I\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="I" Type="OptionHardcoded" MaxLen="1" /><Res Name="IdleTimeout" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols for password in format ####</Desc></Res><ResFormatRaw><![CDATA[<\'R\'> <;> <\'Z\'> <;> <\'I\'> <;> <IdleTimeout[4]>]]></ResFormatRaw></Response></Command><Command Name="ReadDepartmentDifferentName" CmdByte="0x67"><FPOperation>Read data for the state department number and different names.</FPOperation><Args><Arg Name="Option" Value="3" Type="OptionHardcoded" MaxLen="1" /><Arg Name="Number" Value="" Type="Decimal_with_format" MaxLen="2" Format="00"><Desc>2 symbols department number in format ##</Desc></Arg><ArgsFormatRaw><![CDATA[ <Option[\'3\']> <;> <Number[2]> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="Number" Value="" Type="Decimal_with_format" MaxLen="2" Format="00"><Desc>2 symbols department number in format ##</Desc></Res><Res Name="NameAlbanian" Value="" Type="Text" MaxLen="23"><Desc>23 characters for Albanian name</Desc></Res><Res Name="NameSerbian" Value="" Type="Text" MaxLen="23"><Desc>23 characters Serbian name</Desc></Res><Res Name="NameEnglish" Value="" Type="Text" MaxLen="23"><Desc>23 characters English name</Desc></Res><ResFormatRaw><![CDATA[<Number[2]> <;> <NameAlbanian[23]> <;> <NameSerbian[23]> <;> <NameEnglish[23]>]]></ResFormatRaw></Response></Command><Command Name="ProgOperator" CmdByte="0x4A"><FPOperation>Programs the operator\'s name and password.</FPOperation><Args><Arg Name="Number" Value="" Type="Decimal" MaxLen="2"><Desc>Symbols from \'1\' to \'20\' corresponding to operator\'s number</Desc></Arg><Arg Name="Name" Value="" Type="Text" MaxLen="20"><Desc>20 symbols for operator\'s name</Desc></Arg><Arg Name="Password" Value="" Type="Text" MaxLen="6"><Desc>6 symbols for operator\'s password</Desc></Arg><ArgsFormatRaw><![CDATA[ <Number[1..2]> <;> <Name[20]> <;> <Password[6]> ]]></ArgsFormatRaw></Args></Command><Command Name="SetBluetooth_Password" CmdByte="0x4E"><FPOperation>Program device\'s Bluetooth password.</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="B" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="PassLength" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for the BT password len</Desc></Arg><Arg Name="Password" Value="" Type="Text" MaxLen="100"><Desc>Up to 100 symbols for the BT password</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'> <;> <\'B\'> <;> <\'P\'> <;> <PassLength[1..3]> <;> <Password[100]> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadGPRS_APN" CmdByte="0x4E"><FPOperation>Provides information about device\'s GRPS APN.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="G" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="A" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'G\'><;><\'A\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="G" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="A" Type="OptionHardcoded" MaxLen="1" /><Res Name="GPRS_APN_Len" Value="" Type="Decimal" MaxLen="3"><Desc>(Length) Up to 3 symbols for the APN length</Desc></Res><Res Name="APN" Value="" Type="Text" MaxLen="100"><Desc>Up to 100 symbols for the device\'s GPRS APN</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'G\'><;><\'A\'><;><GPRS_APN_Len[1..3]><;><APN[100]>]]></ResFormatRaw></Response></Command><Command Name="ReadPLUqty" CmdByte="0x6B"><FPOperation>Provides information about the quantity registers of the specified article.</FPOperation><Args><Arg Name="PLUNum" Value="" Type="Decimal_with_format" MaxLen="5" Format="00000"><Desc>5 symbols for article number with leading zeroes in format: #####</Desc></Arg><Arg Name="Option" Value="2" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <PLUNum[5]> <;> <Option[\'2\']> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="PLUNum" Value="" Type="Decimal_with_format" MaxLen="5" Format="00000"><Desc>5 symbols for article number with leading zeroes in format #####</Desc></Res><Res Name="Option" Value="2" Type="OptionHardcoded" MaxLen="1" /><Res Name="AvailableQuantity" Value="" Type="Decimal" MaxLen="13"><Desc>Up to13 symbols for quantity in stock</Desc></Res><Res Name="OptionQuantityType" Value="" Type="Option" MaxLen="1"><Options><Option Name="Availability of PLU stock is not monitored" Value="0" /><Option Name="Disable negative quantity" Value="1" /><Option Name="Enable negative quantity" Value="2" /></Options><Desc>1 symbol for Quantity flag with next value:   - \'0\'- Availability of PLU stock is not monitored   - \'1\'- Disable negative quantity   - \'2\'- Enable negative quantity</Desc></Res><ResFormatRaw><![CDATA[<PLUNum[5]> <;> <Option[\'2\']> <;> <AvailableQuantity[1..13]> <;> <OptionQuantityType[1]>]]></ResFormatRaw></Response></Command><Command Name="ProgDepartmentDifferentName" CmdByte="0x47"><FPOperation>Set data for the state department number and different name.</FPOperation><Args><Arg Name="Option" Value="3" Type="OptionHardcoded" MaxLen="1" /><Arg Name="Number" Value="" Type="Decimal_with_format" MaxLen="2" Format="00"><Desc>2 symbols department number in format ##</Desc></Arg><Arg Name="NameAlbanian" Value="" Type="Text" MaxLen="23"><Desc>23 characters for Albanian name</Desc></Arg><Arg Name="NameSerbian" Value="" Type="Text" MaxLen="23"><Desc>23 characters Serbian name</Desc></Arg><Arg Name="NameEnglish" Value="" Type="Text" MaxLen="23"><Desc>23 characters English name</Desc></Arg><ArgsFormatRaw><![CDATA[ <Option[\'3\']> <;> <Number[2]> <;> <NameAlbanian[23]> <;> <NameSerbian[23]> <;> <NameEnglish[23]> ]]></ArgsFormatRaw></Args></Command><Command Name="ScanAndPrintWiFiNetworks" CmdByte="0x4E"><FPOperation>Scan and print all available WiFi networks</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="W" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'> <;> <\'W\'> <;> <\'S\'> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadSerialAndFiscalNums" CmdByte="0x60"><FPOperation>Provides information about the manufacturing number of the fiscal device, FM number and ECR Unique number.</FPOperation><Response ACK="false"><Res Name="SerialNumber" Value="" Type="Text" MaxLen="11"><Desc>11 symbols for individual number of the fiscal device</Desc></Res><Res Name="FMNumber" Value="" Type="Text" MaxLen="11"><Desc>11 symbols for individual number of the fiscal memory</Desc></Res><Res Name="ECR_UniqueNum" Value="" Type="Text" MaxLen="24"><Desc>24 symbols for ECR unique number</Desc></Res><ResFormatRaw><![CDATA[<SerialNumber[11]> <;> <FMNumber[11]> <;> <ECR_UniqueNum[24]>]]></ResFormatRaw></Response></Command><Command Name="SetServerCommunicationModule" CmdByte="0x4E"><FPOperation>Program the communication module, which used to talk with the server</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="E" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionCommunicationModule" Value="" Type="Option" MaxLen="1"><Options><Option Name="GSM" Value="0" /><Option Name="LAN" Value="1" /></Options><Desc>1 symbol with value:   - \'0\' - GSM   - \'1\' - LAN</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'> <;> <\'S\'> <;> <\'E\'> <;> <CommunicationModule[1]> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadGPRS_Username" CmdByte="0x4E"><FPOperation>Provides information about device\'s GPRS username.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="G" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="U" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'G\'><;><\'U\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="G" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="U" Type="OptionHardcoded" MaxLen="1" /><Res Name="GPRS_User_Len" Value="" Type="Decimal" MaxLen="3"><Desc>(Length) Up to 3 symbols for the GPRS username length</Desc></Res><Res Name="Username" Value="" Type="Text" MaxLen="100"><Desc>Up to 100 symbols for the device\'s GPRS username</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'G\'><;><\'U\'><;><GPRS_User_Len[1..3]><;><Username[100]>]]></ResFormatRaw></Response></Command><Command Name="ReceivedOnAccount_PaidOut" CmdByte="0x3B"><FPOperation>Registers cash received on account or paid out.</FPOperation><Args><Arg Name="OperNum" Value="" Type="Decimal" MaxLen="2"><Desc>Symbols from 1 to 20 corresponding to the operator\'s number</Desc></Arg><Arg Name="OperPass" Value="" Type="Text" MaxLen="6"><Desc>6 symbols for operator\'s password</Desc></Arg><Arg Name="reserved" Value="0" Type="OptionHardcoded" MaxLen="1" /><Arg Name="Amount" Value="" Type="Decimal" MaxLen="10"><Desc>Up to 10 symbols for the amount lodged/withdrawn</Desc></Arg><Arg Name="Text" Value="" Type="Text" MaxLen="64"><Desc>TextLength-2 symbols. In the beginning and in the end of line symbol \'#\' is  printed.</Desc><Meta MinLen="64" Compulsory="false" ValIndicatingPresence=";" /></Arg><ArgsFormatRaw><![CDATA[<OperNum[1..2]> <;> <OperPass[6]> <;> <reserved[\'0\']> <;> <Amount[1..10]> {<;> <Text[TextLength-2]>} ]]></ArgsFormatRaw></Args></Command><Command Name="SaveNetworkSettings" CmdByte="0x4E"><FPOperation>After every change on Idle timeout, LAN/WiFi/GPRS usage, LAN/WiFi/TCP/GPRS password or TCP auto start networks settings this Save command needs to be execute.</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="A" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'P\'> <;> <\'A\'> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadCMinfo" CmdByte="0x57"><FPOperation>Read CM info</FPOperation><Args><Arg Name="Option" Value="C" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <Option[\'C\']> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="Option" Value="C" Type="OptionHardcoded" MaxLen="1" /><Res Name="CMUID" Value="" Type="Text" MaxLen="24"><Desc>24 symbols for CM unique ID number</Desc></Res><Res Name="ProductionDate" Value="" Type="DateTime" MaxLen="10" Format="dd-MM-yyyy HH:mm"><Desc>Up to 16 symbols for FD/CM production date</Desc></Res><Res Name="ActivationDate" Value="" Type="DateTime" MaxLen="10" Format="dd-MM-yyyy HH:mm"><Desc>Up to 16 symbols for FD/CM fiscalization date</Desc></Res><Res Name="FDSN" Value="" Type="Text" MaxLen="10"><Desc>10 symbols for coupled FD serial number  CS 4 symbols for CM MCU flash checksum</Desc></Res><Res Name="CS" Value="" Type="Text" MaxLen="4"><Desc>4 symbols for CM MCU flash checksum</Desc></Res><ResFormatRaw><![CDATA[<Option[\'C\']><;> <CMUID[24]><;> <ProductionDate "DD-MM-YYYY hh:mm"><;> <ActivationDate "DD-MM-YYYY hh:mm"> <;> <FDSN[10]><;><CS[4]>]]></ResFormatRaw></Response></Command><Command Name="ReadECRprofileConnectionPeriod" CmdByte="0x4E"><FPOperation>Provides information about period in which the sending attempt is made.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'S\'><;><\'P\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Res Name="ConnectionPeriod" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols about connection in format ####</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'S\'><;><\'P\'><;><ConnectionPeriod[4]>]]></ResFormatRaw></Response></Command><Command Name="DirectCommand" CmdByte="0xF1"><FPOperation>Executes the direct command .</FPOperation><Args><Arg Name="Input" Value="" Type="Text" MaxLen="200"><Desc>Raw request to FP</Desc></Arg></Args><Response ACK="false"><Res Name="Output" Value="" Type="Text" MaxLen="200"><Desc>FP raw response</Desc></Res></Response></Command><Command Name="ReadDetailedFMReportByZNum" CmdByte="0x78"><FPOperation>Storage a detailed FM report by initial and end FM report number.</FPOperation><Args><Arg Name="StartNum" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols for the initial report number included in report, format ####</Desc></Arg><Arg Name="EndNum" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols for the final report number included in report, format ####</Desc></Arg><Arg Name="PCStorage" Value="8" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <StartNum[4]><;><EndNum[4]><;><PCStorage[\'8\']> ]]></ArgsFormatRaw></Args><Response ACK="true" ACK_PLUS="true" /></Command><Command Name="ReadEJByZBlocks" CmdByte="0x7C"><FPOperation>Read Electronic Journal Report from by number of Z report blocks.</FPOperation><Args><Arg Name="" Value="J0" Type="OptionHardcoded" MaxLen="2" /><Arg Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="StartZNum" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols for initial number report in format ####</Desc></Arg><Arg Name="EndZNum" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols for final number report in format ####</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'J0\'> <;> <\'Z\'> <;> <StartZNum[4]> <;> <EndZNum[4]> ]]></ArgsFormatRaw></Args><Response ACK="true" ACK_PLUS="true" /></Command><Command Name="ReadCurrentRecInfo" CmdByte="0x72"><FPOperation>Read the current status of the receipt.</FPOperation><Response ACK="false"><Res Name="OptionIsReceiptOpened" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol with value:   - \'0\' - No   - \'1\' - Yes</Desc></Res><Res Name="ReceiptType" Value="" Type="Text" MaxLen="1"><Desc>1 symbol with value \'1\'</Desc></Res><Res Name="SalesNumber" Value="" Type="Text" MaxLen="3"><Desc>3 symbols for number of sales</Desc></Res><Res Name="SubtotalVATG0" Value="" Type="Text" MaxLen="11"><Desc>11 symbols for subtotal from goods by VAT groups</Desc></Res><Res Name="SubtotalVATG1" Value="" Type="Text" MaxLen="11"><Desc>11 symbols for subtotal from goods by VAT groups</Desc></Res><Res Name="SubtotalVATG2" Value="" Type="Text" MaxLen="11"><Desc>11 symbols for subtotal from goods by VAT groups</Desc></Res><Res Name="SubtotalVATG3" Value="" Type="Text" MaxLen="11"><Desc>11 symbols for subtotal from goods by VAT groups</Desc></Res><Res Name="SubtotalVATG4" Value="" Type="Text" MaxLen="11"><Desc>11 symbols for subtotal from goods by VAT groups</Desc></Res><Res Name="SubtotalVATG5" Value="" Type="Text" MaxLen="11"><Desc>11 symbols for subtotal from goods by VAT groups</Desc></Res><Res Name="SubtotalVATG6" Value="" Type="Text" MaxLen="11"><Desc>11 symbols for subtotal from goods by VAT groups</Desc></Res><Res Name="SubtotalVATG7" Value="" Type="Text" MaxLen="11"><Desc>11 symbols for subtotal from goods by VAT groups</Desc></Res><Res Name="OptionInitiatedPayment" Value="" Type="Option" MaxLen="1"><Options><Option Name="initiated payment" Value="1" /><Option Name="not initiated payment" Value="0" /></Options><Desc>1 symbol with value:   - \'1\' - initiated payment   - \'0\' - not initiated payment</Desc></Res><Res Name="OptionFinalizedPayment" Value="" Type="Option" MaxLen="1"><Options><Option Name="finalized payment" Value="1" /><Option Name="not finalized payment" Value="0" /></Options><Desc>1 symbol with value:   - \'1\' - finalized payment   - \'0\' - not finalized payment</Desc></Res><Res Name="OptionPowerDownInReceipt" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol with value:  - \'0\' - No  - \'1\' - Yes</Desc></Res><Res Name="ChangeAmount" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols the amount of the due change in the stated payment  type</Desc></Res><Res Name="OptionChangeType" Value="" Type="Option" MaxLen="1"><Options><Option Name="Change In Cash" Value="0" /><Option Name="Change In Currency" Value="2" /><Option Name="Same As The payment" Value="1" /></Options><Desc>1 symbols with value:   - \'0\' - Change In Cash   - \'1\' - Same As The payment   - \'2\' - Change In Currency</Desc></Res><ResFormatRaw><![CDATA[<IsReceiptOpened[1]> <;> <ReceiptType[1]><;><SalesNumber[3]> <;> <SubtotalVATG0[11]> <;> <SubtotalVATG1[11]> <;> < SubtotalVATG2[11]> <;> <SubtotalVATG3[11]> <;> <SubtotalVATG4[11]> <;> <SubtotalVATG5[11]> <;> <SubtotalVATG6[11]> <;> <SubtotalVATG7[11]> <;> <InitiatedPayment[1]> <;> <FinalizedPayment[1]> <;> < PowerDownInReceipt [1]> <;> <ChangeAmount[1..11]> <;> <OptionChangeType[1]]]></ResFormatRaw></Response></Command><Command Name="SetWiFi_NetworkName" CmdByte="0x4E"><FPOperation>Program device\'s WiFi network name where it will connect. To apply use - 4Eh / N - Save network settings</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="W" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="N" Type="OptionHardcoded" MaxLen="1" /><Arg Name="WiFiNameLength" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for the WiFi network name len</Desc></Arg><Arg Name="WiFiNetworkName" Value="" Type="Text" MaxLen="100"><Desc>Up to 100 symbols for the device\'s WiFi ssid network name</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'> <;> <\'W\'> <;> <\'N\'> <;> <WiFiNameLength[1..3]> <;>  <WiFiNetworkName[100]> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadEJByZBlocksWithoutReceipts" CmdByte="0x7C"><FPOperation>Read Electronic Journal Report from by number of Z report blocks only of the current receipt .</FPOperation><Args><Arg Name="" Value="J0" Type="OptionHardcoded" MaxLen="2" /><Arg Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="StartZNum" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols for initial number report in format ####</Desc></Arg><Arg Name="EndZNum" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols for final number report in format ####</Desc></Arg><Arg Name="" Value="D" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'J0\'> <;> <\'Z\'> <;> <StartZNum[4]> <;> <EndZNum[4]> <;> <\'D\'> ]]></ArgsFormatRaw></Args><Response ACK="true" ACK_PLUS="true" /></Command><Command Name="SelectExternalDisplay" CmdByte="0x56"><FPOperation>Select type of display</FPOperation><Args><Arg Name="Option" Value="E" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionExternalDisplay" Value="" Type="Option" MaxLen="1"><Options><Option Name="Others" Value="0" /><Option Name="Tremol display" Value="1" /></Options><Desc>1 symbol with value:  -\'1\' - Tremol display  -\'0\' - Others</Desc></Arg><ArgsFormatRaw><![CDATA[ <Option[\'E\']> <;> <ExternalDisplay[1]>  ]]></ArgsFormatRaw></Args></Command><Command Name="PrintDetailedFMReportByNum" CmdByte="0x78"><FPOperation>Print a detailed FM report by initial and end FM report number.</FPOperation><Args><Arg Name="StartNum" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols for the initial report number included in report, format ####</Desc></Arg><Arg Name="EndNum" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols for the final report number included in report, format ####</Desc></Arg><ArgsFormatRaw><![CDATA[ <StartNum[4]><;><EndNum[4]> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadShortReceiptSending" CmdByte="0x5A"><FPOperation>Read info for enable/disable short receipts</FPOperation><Args><Arg Name="Option" Value="F" Type="OptionHardcoded" MaxLen="1" /><Arg Name="Option" Value="R" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <Option[\'F\']> <;> <Option[\'R\']>  ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="Option" Value="ZF" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionActivationRS" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol with value :  - \'1\' - Yes  - \'0\' - No</Desc></Res><ResFormatRaw><![CDATA[<Option[\'ZF\']> <;> <ActivationRS[1]>]]></ResFormatRaw></Response></Command><Command Name="ReadDeviceMAC_Address" CmdByte="0x4E"><FPOperation>Provides information about TCP device MAC address</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="6" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'> <;> <\'T\'> <;> <\'6\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="6" Type="OptionHardcoded" MaxLen="1" /><Res Name="DeviceMAC" Value="" Type="Text" MaxLen="12"><Desc>12 symbols for device MAC</Desc></Res><ResFormatRaw><![CDATA[<\'R\'> <;> <\'T\'> <;> <\'6\'> <;> <DeviceMAC[12]>]]></ResFormatRaw></Response></Command><Command Name="SellPLUwithSpecifiedVAT" CmdByte="0x31"><FPOperation>Register the sell of article with specified name, price, quantity, VAT class and/or discount/addition on the transaction.</FPOperation><Args><Arg Name="NamePLU" Value="" Type="Text" MaxLen="36"><Desc>36 symbols for article\'s name</Desc></Arg><Arg Name="OptionVATClass" Value="" Type="Option" MaxLen="1"><Options><Option Name="VAT Class A" Value="A" /><Option Name="VAT Class B" Value="B" /><Option Name="VAT Class C" Value="C" /><Option Name="VAT Class D" Value="D" /><Option Name="VAT Class E" Value="E" /><Option Name="VAT Class F" Value="F" /><Option Name="VAT Class G" Value="G" /><Option Name="VAT Class H" Value="H" /></Options><Desc>1 character for VAT class:   - \'A\' - VAT Class A   - \'B\' - VAT Class B   - \'C\' - VAT Class C   - \'D\' - VAT Class D   - \'E\' - VAT Class E   - \'F\' - VAT Class F   - \'G\' - VAT Class G   - \'H\' - VAT Class H</Desc></Arg><Arg Name="Price" Value="" Type="Decimal" MaxLen="10"><Desc>Up to 10 symbols for article\'s price.</Desc></Arg><Arg Name="Quantity" Value="" Type="Decimal" MaxLen="10"><Desc>Up to 10 symbols for quantity</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence="*" /></Arg><Arg Name="DiscAddP" Value="" Type="Decimal" MaxLen="7"><Desc>Up to 7 symbols for percentage of discount/addition.  Use minus sign \'-\' for discount</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence="," /></Arg><Arg Name="DiscAddV" Value="" Type="Decimal" MaxLen="8"><Desc>Up to 8 symbols for value of discount/addition.  Use minus sign \'-\' for discount</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence=":" /></Arg><Arg Name="DepNum" Value="" Type="Decimal_plus_80h" MaxLen="2"><Desc>2 symbol for article department  attachment, formed in the following manner: DepNum[HEX] + 80h  example: Dep01 = 81h, Dep02 = 82h … Dep19 = 93h</Desc><Meta MinLen="2" Compulsory="false" ValIndicatingPresence="!" /></Arg><ArgsFormatRaw><![CDATA[ <NamePLU[36]> <;> <OptionVATClass[1]> <;> <Price[1..10]>{<\'*\'> <Quantity[1..10]>} {<\',\'> <DiscAddP[1..7]>} {<\':\'> <DiscAddV[1..8]>} {<\'!\'> <DepNum[2]>} ]]></ArgsFormatRaw></Args></Command><Command Name="PrintBriefFMReportByDate" CmdByte="0x7B"><FPOperation>Print a brief FM report by initial and end date.</FPOperation><Args><Arg Name="StartDate" Value="" Type="DateTime" MaxLen="10" Format="ddMMyy"><Desc>6 symbols for initial date in the DDMMYY format</Desc></Arg><Arg Name="EndDate" Value="" Type="DateTime" MaxLen="10" Format="ddMMyy"><Desc>6 symbols for final date in the DDMMYY format</Desc></Arg><ArgsFormatRaw><![CDATA[ <StartDate "DDMMYY"><;><EndDate "DDMMYY"> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadServiceMode" CmdByte="0x5A"><FPOperation>Read Service mode status</FPOperation><Args><Arg Name="Option" Value="S" Type="OptionHardcoded" MaxLen="1" /><Arg Name="Option" Value="R" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <Option[\'S\']> <;> <Option[\'R\']>  ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="Option" Value="ZS" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionServiceMode" Value="" Type="Option" MaxLen="1"><Options><Option Name="Sales mode" Value="0" /><Option Name="Service mode" Value="1" /></Options><Desc>1 symbol:   -\'1\' - Service mode  -\'0\' - Sales mode</Desc></Res><ResFormatRaw><![CDATA[<Option[\'ZS\']> <;> <ServiceMode[1]>]]></ResFormatRaw></Response></Command><Command Name="DisplayTextLine1" CmdByte="0x25"><FPOperation>Shows a 20-symbols text in the upper external display line.</FPOperation><Args><Arg Name="Text" Value="" Type="Text" MaxLen="20"><Desc>20 symbols text</Desc></Arg><ArgsFormatRaw><![CDATA[ <Text[20]> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadServerAddress" CmdByte="0x4E"><FPOperation>Provides information about the ECR\'s password</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'> <;> <\'S\'> <;> <\'S\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Res Name="ParamLength" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for parameter length</Desc></Res><Res Name="ServerAddress" Value="" Type="Text" MaxLen="100"><Desc>Up to 100 symbols for server password</Desc></Res><ResFormatRaw><![CDATA[<\'R\'> <;> <\'S\'> <;> <\'S\'> <;> <ParamLength[1..3]> <;> <ServerAddress [100]>]]></ResFormatRaw></Response></Command><Command Name="ReadVATrates" CmdByte="0x62"><FPOperation>Provides information about the current VAT rates which are the last values stored into the FM.</FPOperation><Response ACK="false"><Res Name="VATrate0" Value="" Type="Decimal_with_format" MaxLen="7" Format="00.00%"><Desc>Value of VAT rate A from 7 symbols in format ##.##%</Desc></Res><Res Name="VATrate1" Value="" Type="Decimal_with_format" MaxLen="7" Format="00.00%"><Desc>Value of VAT rate B from 7 symbols in format ##.##%</Desc></Res><Res Name="VATrate2" Value="" Type="Decimal_with_format" MaxLen="7" Format="00.00%"><Desc>Value of VAT rate C from 7 symbols in format ##.##%</Desc></Res><Res Name="VATrate3" Value="" Type="Decimal_with_format" MaxLen="7" Format="00.00%"><Desc>Value of VAT rate D from 7 symbols in format ##.##%</Desc></Res><Res Name="VATrate4" Value="" Type="Decimal_with_format" MaxLen="7" Format="00.00%"><Desc>Value of VAT rate E from 7 symbols in format ##.##%</Desc></Res><Res Name="VATrate5" Value="" Type="Decimal_with_format" MaxLen="7" Format="00.00%"><Desc>Value of VAT rate F from 7 symbols in format ##.##%</Desc></Res><Res Name="VATrate6" Value="" Type="Decimal_with_format" MaxLen="7" Format="00.00%"><Desc>Value of VAT rate G from 7 symbols in format ##.##%</Desc></Res><Res Name="VATrate7" Value="" Type="Decimal_with_format" MaxLen="7" Format="00.00%"><Desc>Value of VAT rate H from 7 symbols in format ##.##%</Desc></Res><ResFormatRaw><![CDATA[<VATrate0[7]><;><VATrate1[7]><;><VATrate2[7]><;><VATrate3[7]><;> <VATrate4[7]> <;> <VATrate5[7]> <;> <VATrate6[7]> <;> <VATrate7[7]>]]></ResFormatRaw></Response></Command><Command Name="ReadDailyReceivedSalesAmounts" CmdByte="0x6E"><FPOperation>Provides information about the amounts received from sales.</FPOperation><Args><Arg Name="" Value="4" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'4\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="4" Type="OptionHardcoded" MaxLen="1" /><Res Name="AmountPayment" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for amount received from sales by cash</Desc></Res><Res Name="AmountPaymentOthers" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for amount received from sales by others payment</Desc></Res><ResFormatRaw><![CDATA[<\'4\'> <;> <AmountPayment[1..11]> <;> <AmountPaymentOthers[1..11]>]]></ResFormatRaw></Response></Command><Command Name="ProgPLUqty" CmdByte="0x4B"><FPOperation>Programs available quantity and quantiy type for a certain article in the internal database.</FPOperation><Args><Arg Name="PLUNum" Value="" Type="Decimal_with_format" MaxLen="5" Format="00000"><Desc>5 symbols for article number in format: #####</Desc></Arg><Arg Name="Option" Value="2" Type="OptionHardcoded" MaxLen="1" /><Arg Name="AvailableQuantity" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for quantity in stock</Desc></Arg><Arg Name="OptionQuantityType" Value="" Type="Option" MaxLen="1"><Options><Option Name="Availability of PLU stock is not monitored" Value="0" /><Option Name="Disable negative quantity" Value="1" /><Option Name="Enable negative quantity" Value="2" /></Options><Desc>1 symbol for Quantity flag with next value:    - \'0\'- Availability of PLU stock is not monitored    - \'1\'- Disable negative quantity    - \'2\'- Enable negative quantity</Desc></Arg><ArgsFormatRaw><![CDATA[<PLUNum[5]><;><Option[\'2\']><;><AvailableQuantity [1..11]> <;> <OptionQuantityType[1]> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadRegistrationInfo" CmdByte="0x61"><FPOperation>Provides information about the owner\'s numbers and registration date time.</FPOperation><Response ACK="false"><Res Name="IDNum" Value="" Type="Text" MaxLen="13"><Desc>13 symbols owner\'s ID number</Desc></Res><Res Name="VATNum" Value="" Type="Text" MaxLen="15"><Desc>15 symbols for owner\'s VAT registration number</Desc></Res><Res Name="RegistrationNumber" Value="" Type="Text" MaxLen="6"><Desc>Register number on the Fiscal device by registration</Desc></Res><Res Name="RegistrationDate" Value="" Type="DateTime" MaxLen="10" Format="dd-MM-yyyy HH:mm"><Desc>Date of registration</Desc></Res><ResFormatRaw><![CDATA[<IDNum[13]> <;> <VATNum[15]> <;> <RegistrationNumber[6]><;> <RegistrationDate "DD-MM-YYYY HH:MM" >]]></ResFormatRaw></Response></Command><Command Name="ClearDisplay" CmdByte="0x24"><FPOperation>Clears the external display.</FPOperation></Command><Command Name="SetDHCP_Enabled" CmdByte="0x4E"><FPOperation>Program device\'s TCP network DHCP enabled or disabled. To apply use - 4Eh / N - Save network settings</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="1" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionDhcpStatus" Value="" Type="Option" MaxLen="1"><Options><Option Name="Disabled" Value="0" /><Option Name="Enabled" Value="1" /></Options><Desc>1 symbol with value:   - \'0\' - Disabled   - \'1\' - Enabled</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'> <;> <\'T\'> <;> <\'1\'> <;> <DhcpStatus[1]> ]]></ArgsFormatRaw></Args></Command><Command Name="SetGPRS_APN" CmdByte="0x4E"><FPOperation>Program device\'s GPRS APN. To apply use - SaveNetworkSettings()</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="G" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="A" Type="OptionHardcoded" MaxLen="1" /><Arg Name="GPRS_APN_Len" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for the APN len</Desc></Arg><Arg Name="APN" Value="" Type="Text" MaxLen="100"><Desc>Up to 100 symbols for the device\'s GPRS APN</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'><;><\'G\'><;><\'A\'><;><GPRS_APN_Len[1..3]><;><APN[100]> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadDailyPObyOperator" CmdByte="0x6F"><FPOperation>Provides information about the PO and the total number of operations by specified operator.</FPOperation><Args><Arg Name="" Value="3" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OperNum" Value="" Type="Decimal" MaxLen="2"><Desc>Symbols from 1 to 20 corresponding to operator\'s  number</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'3\'> <;> <OperNum[1..2]> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="3" Type="OptionHardcoded" MaxLen="1" /><Res Name="OperNum" Value="" Type="Decimal" MaxLen="2"><Desc>Symbols from 1 to 20 corresponding to operator\'s number</Desc></Res><Res Name="AmountPO_Payments" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for the PO by type of payment</Desc></Res><Res Name="NumPO" Value="" Type="Decimal" MaxLen="5"><Desc>Up to 5 symbols for the total number of operations</Desc></Res><ResFormatRaw><![CDATA[<\'3\'> <;> <OperNum[1..2]> <;> <AmountPO_Payments[1..11]> <;> <NumPO[1..5]>]]></ResFormatRaw></Response></Command><Command Name="ProgramReceiptViewParameter" CmdByte="0x4F"><FPOperation>Programs receipt view parameter</FPOperation><Args><Arg Name="" Value="F" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="W" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionReceiptView" Value="" Type="Option" MaxLen="1"><Options><Option Name="Shortened view of receipt" Value="1" /><Option Name="Standart view" Value="0" /></Options><Desc>1 symbol with value:   - \'0\' - Standart view   - \'1\' - Shortened view of receipt</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'F\'> <;> <\'W\'> <;> <ReceiptView[1]> ]]></ArgsFormatRaw></Args></Command><Command Name="PrintEJByReceiptNumFromZrep" CmdByte="0x7C"><FPOperation>Printing Electronic Journal Report from receipt number to receipt number.</FPOperation><Args><Arg Name="" Value="J1" Type="OptionHardcoded" MaxLen="2" /><Arg Name="" Value="N" Type="OptionHardcoded" MaxLen="1" /><Arg Name="StartReceiptNum" Value="" Type="Decimal_with_format" MaxLen="6" Format="000000"><Desc>6 symbols for initial receipt number included in report in format ######</Desc></Arg><Arg Name="EndReceiptNum" Value="" Type="Decimal_with_format" MaxLen="6" Format="000000"><Desc>6 symbols for final receipt number included in report in format ######</Desc></Arg><ArgsFormatRaw><![CDATA[<\'J1\'><;><\'N\'><;><StartReceiptNum[6]><;><EndReceiptNum[6]> ]]></ArgsFormatRaw></Args></Command><Command Name="ProgPLUprice" CmdByte="0x4B"><FPOperation>Program the price for a certain article from the internal database.</FPOperation><Args><Arg Name="PLUNum" Value="" Type="Decimal_with_format" MaxLen="5" Format="00000"><Desc>5 symbols for article number in format: #####</Desc></Arg><Arg Name="Option" Value="4" Type="OptionHardcoded" MaxLen="1" /><Arg Name="Price" Value="" Type="Decimal" MaxLen="10"><Desc>Up to 10 symbols for article price</Desc></Arg><Arg Name="OptionPrice" Value="" Type="Option" MaxLen="1"><Options><Option Name="Free price is disable valid only programmed price" Value="0" /><Option Name="Free price is enable" Value="1" /><Option Name="Limited price" Value="2" /></Options><Desc>1 byte for Price flag with next value:   - \'0\'- Free price is disable valid only programmed price   - \'1\'- Free price is enable   - \'2\'- Limited price</Desc></Arg><ArgsFormatRaw><![CDATA[ <PLUNum[5]> <;> <Option[\'4\']> <;> <Price[1..10]> <;> <OptionPrice[1]> ]]></ArgsFormatRaw></Args></Command><Command Name="RawRead" CmdByte="0xFF"><FPOperation> Reads raw bytes from FP.</FPOperation><Args><Arg Name="Count" Value="" Type="Decimal" MaxLen="5"><Desc>How many bytes to read if EndChar is not specified</Desc></Arg><Arg Name="EndChar" Value="" Type="Text" MaxLen="1"><Desc>The character marking the end of the data. If present Count parameter is ignored.</Desc></Arg></Args><Response ACK="false"><Res Name="Bytes" Value="" Type="Base64" MaxLen="100000"><Desc>FP raw response in BASE64 encoded string</Desc></Res></Response></Command><Command Name="ReadDHCP_Status" CmdByte="0x4E"><FPOperation>Provides information about device\'s DHCP status</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="1" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'> <;> <\'T\'> <;> <\'1\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="1" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionDhcpStatus" Value="" Type="Option" MaxLen="1"><Options><Option Name="Disabled" Value="0" /><Option Name="Enabled" Value="1" /></Options><Desc>(DHCP Status)1 symbol with value:   - \'0\' - Disabled   - \'1\' - Enabled</Desc></Res><ResFormatRaw><![CDATA[<\'R\'> <;> <\'T\'> <;> <\'1\'> <;> <DhcpStatus[1]>]]></ResFormatRaw></Response></Command><Command Name="ReadTCP_Addresses" CmdByte="0x4E"><FPOperation>Provides information about device\'s IP address, subnet mask, gateway address, DNS address.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionAddressType" Value="" Type="Option" MaxLen="1"><Options><Option Name="DNS address" Value="5" /><Option Name="Gateway address" Value="4" /><Option Name="IP address" Value="2" /><Option Name="Subnet Mask" Value="3" /></Options><Desc>1 symbol with value:   - \'2\' - IP address   - \'3\' - Subnet Mask   - \'4\' - Gateway address   - \'5\' - DNS address</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'R\'> <;> <\'T\'> <;> <AddressType[1]> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionAddressType" Value="" Type="Option" MaxLen="1"><Options><Option Name="DNS address" Value="5" /><Option Name="Gateway address" Value="4" /><Option Name="IP address" Value="2" /><Option Name="Subnet Mask" Value="3" /></Options><Desc>(Address) 1 symbol with value:   - \'2\' - IP address   - \'3\' - Subnet Mask   - \'4\' - Gateway address   - \'5\' - DNS address</Desc></Res><Res Name="DeviceAddress" Value="" Type="Text" MaxLen="15"><Desc>15 symbols for the device\'s addresses</Desc></Res><ResFormatRaw><![CDATA[<\'R\'> <;> <\'T\'> <;> <AddressType[1]> <;> <DeviceAddress[15]>]]></ResFormatRaw></Response></Command><Command Name="ProgTaxiServiceGeneral" CmdByte="0x4B"><FPOperation>Programs the general data for a certain taxi service in the internal FD database. The name field is fixed.</FPOperation><Args><Arg Name="ServiceNum" Value="" Type="Text" MaxLen="2"><Desc>2 symbols for service number</Desc></Arg><Arg Name="Option" Value="1" Type="OptionHardcoded" MaxLen="1" /><Arg Name="ServiceNameAL" Value="" Type="Text" MaxLen="30"><Desc>30 symbols for service name</Desc></Arg><Arg Name="ServiceNameSR" Value="" Type="Text" MaxLen="30"><Desc>30 symbols for service name</Desc></Arg><Arg Name="ServiceNameEN" Value="" Type="Text" MaxLen="30"><Desc>30 symbols for service name</Desc></Arg><Arg Name="OptionVATClass" Value="" Type="Option" MaxLen="1"><Options><Option Name="VAT Class A" Value="A" /><Option Name="VAT Class B" Value="B" /><Option Name="VAT Class C" Value="C" /><Option Name="VAT Class D" Value="D" /><Option Name="VAT Class E" Value="E" /><Option Name="VAT Class F" Value="F" /><Option Name="VAT Class G" Value="G" /><Option Name="VAT Class H" Value="H" /></Options><Desc>1 character for article VAT Class:   - \'A\' - VAT Class A   - \'B\' - VAT Class B   - \'C\' - VAT Class C   - \'D\' - VAT Class D   - \'E\' - VAT Class E   - \'F\' - VAT Class F   - \'G\' - VAT Class G   - \'H\' - VAT Class H</Desc></Arg><ArgsFormatRaw><![CDATA[ <ServiceNum[2]> <;> <Option[\'1\']> <;> <ServiceNameAL[30]> <;> <ServiceNameSR[30]> <;> <ServiceNameEN[30]> <;> < OptionVATClass[1] > ]]></ArgsFormatRaw></Args></Command><Command Name="ReadECRprofileType" CmdByte="0x4E"><FPOperation>Provides information about device\'s profile type.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="Y" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'S\'><;><\'Y\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="Y" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionProfileType" Value="" Type="Option" MaxLen="1"><Options><Option Name="Profile 0" Value="0" /><Option Name="Profile 1" Value="1" /></Options><Desc>(Profile type) 1 symbol with value:   - \'0\'- Profile 0   - \'1\' - Profile 1</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'S\'><;><\'Y\'><;><ProfileType[1]>]]></ResFormatRaw></Response></Command><Command Name="ProgHeader" CmdByte="0x49"><FPOperation>Program the contents of a header lines.</FPOperation><Args><Arg Name="OptionHeaderLine" Value="" Type="Option" MaxLen="1"><Options><Option Name="Header 1" Value="1" /><Option Name="Header 2" Value="2" /><Option Name="Header 3" Value="3" /><Option Name="Header 4" Value="4" /><Option Name="Header 5" Value="5" /><Option Name="Header 6" Value="6" /><Option Name="Header 7" Value="7" /><Option Name="Header 8" Value="8" /></Options><Desc>1 symbol with value:   - \'1\' - Header 1   - \'2\' - Header 2   - \'3\' - Header 3   - \'4\' - Header 4   - \'5\' - Header 5   - \'6\' - Header 6   - \'7\' - Header 7   - \'8\' - Header 8</Desc></Arg><Arg Name="HeaderText" Value="" Type="Text" MaxLen="64"><Desc>TextLength symbols for header lines</Desc></Arg><ArgsFormatRaw><![CDATA[<OptionHeaderLine[1]> <;> <HeaderText[TextLength]> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadLanguage" CmdByte="0x4F"><FPOperation>Read the language of the device</FPOperation><Args><Arg Name="" Value="L" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'L\'> <;> <\'R\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="L" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionLanguage" Value="" Type="Option" MaxLen="1"><Options><Option Name="Albanian" Value="0" /><Option Name="English" Value="2" /><Option Name="Serbian" Value="1" /></Options><Desc>1 symbol with value:   - \'0\' - Albanian   - \'1\' - Serbian   - \'2\' - English</Desc></Res><ResFormatRaw><![CDATA[<\'L\'> <;> <\'R\'> <;> < Language [1]>]]></ResFormatRaw></Response></Command><Command Name="PrintOptionalDiagnostics" CmdByte="0x22"><FPOperation>Prints out SD card, crypto modul and FM diagnostic receipt.</FPOperation><Args><Arg Name="OptionDiagnostics" Value="" Type="Option" MaxLen="1"><Options><Option Name="Crypto modul" Value="C" /><Option Name="FM" Value="F" /><Option Name="SD card" Value="S" /></Options><Desc>1 symbol with values:   - \'S\'- SD card   - \'C\' - Crypto modul   - \'F\' - FM</Desc></Arg><ArgsFormatRaw><![CDATA[ <OptionDiagnostics[1]> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadPLUDifferentName" CmdByte="0x6B"><FPOperation>Provides information about the price and different name of the specified article.</FPOperation><Args><Arg Name="PLUNum" Value="" Type="Decimal_with_format" MaxLen="5" Format="00000"><Desc>5 symbols for article number with leading zeroes in format: #####</Desc></Arg><Arg Name="Option" Value="6" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <PLUNum[5]><;><Option[\'6\']> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="PLUNum" Value="" Type="Decimal_with_format" MaxLen="5" Format="00000"><Desc>(PLU Number) 5 symbols for article number in format: #####</Desc></Res><Res Name="Option" Value="6" Type="OptionHardcoded" MaxLen="1" /><Res Name="PLUNameAlbanian" Value="" Type="Text" MaxLen="32"><Desc>32 symbols for Albanian PLU</Desc></Res><Res Name="PLUNameSerbian" Value="" Type="Text" MaxLen="32"><Desc>32 symbols for Serbian PLU</Desc></Res><Res Name="PLUNameEnglish" Value="" Type="Text" MaxLen="32"><Desc>32 symbols for English PLU</Desc></Res><ResFormatRaw><![CDATA[<PLUNum[5]><;><Option[\'6\']><;><PLUNameAlbanian[32]><;> <PLUNameSerbian[32]><;>< PLUNameEnglish[32]>]]></ResFormatRaw></Response></Command><Command Name="ProgDepartmentOption1" CmdByte="0x47"><FPOperation>Set data for the state department number from the internal FD database.</FPOperation><Args><Arg Name="Option" Value="1" Type="OptionHardcoded" MaxLen="1" /><Arg Name="Number" Value="" Type="Decimal_with_format" MaxLen="2" Format="00"><Desc>2 symbols department number in format ##</Desc></Arg><Arg Name="Name" Value="" Type="Text" MaxLen="23"><Desc>23 characters department name</Desc></Arg><Arg Name="OptionVATClass" Value="" Type="Option" MaxLen="1"><Options><Option Name="VAT Class A" Value="A" /><Option Name="VAT Class B" Value="B" /><Option Name="VAT Class C" Value="C" /><Option Name="VAT Class D" Value="D" /><Option Name="VAT Class E" Value="E" /><Option Name="VAT Class F" Value="F" /><Option Name="VAT Class G" Value="G" /><Option Name="VAT Class H" Value="H" /></Options><Desc>1 character for article VAT Class:   - \'A\' - VAT Class A   - \'B\' - VAT Class B   - \'C\' - VAT Class C   - \'D\' - VAT Class D   - \'E\' - VAT Class E   - \'F\' - VAT Class F   - \'G\' - VAT Class G   - \'H\' - VAT Class H</Desc></Arg><Arg Name="Price" Value="" Type="Decimal" MaxLen="10"><Desc>Up to 10 symbols for department price</Desc></Arg><Arg Name="FlagsPrice" Value="" Type="Flags" MaxLen="1"><Desc>1 symbol with value:  Flags.7=1  Flags.6=0  Flags.5=0  Flags.4=0  Flags.3=1 Yes, Flags.3=0 No (Fractional quantity disabled)  Flags.2=1 Yes, Flags.2=0 No (Single Transaction)  Flags.1=1 Yes, Flags.1=0 No (Free price limited)  Flags.0=1 Yes, Flags.0=0 No (Free price enabled)</Desc></Arg><ArgsFormatRaw><![CDATA[ <Option[\'1\']> <;> <Number[2]> <;> <Name[23]> <;> <OptionVATClass[1]> <;> <Price[1..10]> <;> <FlagsPrice[1]> ]]></ArgsFormatRaw></Args></Command><Command Name="UnpairAllDevices" CmdByte="0x4E"><FPOperation>Removes all paired devices.</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="B" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="D" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'P\'> <;> <\'B\'> <;> <\'D\'> ]]></ArgsFormatRaw></Args></Command><Command Name="DisplayDateTime" CmdByte="0x28"><FPOperation>Shows the current date and time on the external display.</FPOperation></Command><Command Name="RefundPLUwithSpecifiedVAT" CmdByte="0x3C"><FPOperation>Register the refund of article with specified name, price, quantity, VAT class and/or discount/addition on the transaction.</FPOperation><Args><Arg Name="NamePLU" Value="" Type="Text" MaxLen="36"><Desc>36 symbols for article\'s name</Desc></Arg><Arg Name="OptionVATClass" Value="" Type="Option" MaxLen="1"><Options><Option Name="VAT Class A" Value="A" /><Option Name="VAT Class B" Value="B" /><Option Name="VAT Class C" Value="C" /><Option Name="VAT Class D" Value="D" /><Option Name="VAT Class E" Value="E" /><Option Name="VAT Class F" Value="F" /><Option Name="VAT Class G" Value="G" /><Option Name="VAT Class H" Value="H" /></Options><Desc>1 character for VAT class:   - \'A\' - VAT Class A   - \'B\' - VAT Class B   - \'C\' - VAT Class C   - \'D\' - VAT Class D   - \'E\' - VAT Class E   - \'F\' - VAT Class F   - \'G\' - VAT Class G   - \'H\' - VAT Class H</Desc></Arg><Arg Name="Price" Value="" Type="Decimal" MaxLen="10"><Desc>Up to 10 symbols for article\'s price.</Desc></Arg><Arg Name="Quantity" Value="" Type="Decimal" MaxLen="10"><Desc>Up to 10 symbols for quantity</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence="*" /></Arg><Arg Name="DiscAddP" Value="" Type="Decimal" MaxLen="7"><Desc>Up to 7 symbols for percentage of discount/addition.  Use minus sign \'-\' for discount</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence="," /></Arg><Arg Name="DiscAddV" Value="" Type="Decimal" MaxLen="8"><Desc>Up to 8 symbols for value of discount/addition.  Use minus sign \'-\' for discount</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence=":" /></Arg><Arg Name="DepNum" Value="" Type="Decimal_plus_80h" MaxLen="2"><Desc>1 symbol for article department  attachment, formed in the following manner; example: Dep01=81h,  Dep02=82h … Dep19=93h</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence="!" /></Arg><ArgsFormatRaw><![CDATA[ <NamePLU[36]> <;> <OptionVATClass[1]> <;> <Price[1..10]>{<\'*\'> <Quantity[1..10]>} {<\',\'> <DiscAddP[1..7]>} {<\':\'> <DiscAddV[1..8]>}{<\'!\'><DepNum[1]>} ]]></ArgsFormatRaw></Args></Command><Command Name="SetTCP_AutoStart" CmdByte="0x4E"><FPOperation>Set device\'s TCP autostart . To apply use - 4Eh / N - Save network settings</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="2" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionTCPAutoStart" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol with value:   - \'0\' - No   - \'1\' - Yes</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'> <;> <\'Z\'> <;> <\'2\'> <;> <TCPAutoStart[1]> ]]></ArgsFormatRaw></Args></Command><Command Name="SetTCP_ActiveModule" CmdByte="0x4E"><FPOperation>Sets the used TCP module for communication - Lan or WiFi. To apply use - 4Eh / N - Save network settings</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="U" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionUsedModule" Value="" Type="Option" MaxLen="1"><Options><Option Name="LAN" Value="1" /><Option Name="WiFi" Value="2" /></Options><Desc>1 symbol with value:   - \'1\' - LAN   - \'2\' - WiFi</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'> <;> <\'Z\'> <;> <\'U\'> <;> <UsedModule[1]>  ]]></ArgsFormatRaw></Args></Command><Command Name="ReadPLUName" CmdByte="0x6B"><FPOperation>Provides information about the price and name of the specified  article.</FPOperation><Args><Arg Name="PLUNum" Value="" Type="Decimal_with_format" MaxLen="5" Format="00000"><Desc>5 symbols for article number in format: #####</Desc></Arg><Arg Name="Option" Value="5" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <PLUNum[5]><;><Option[\'5\']> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="PLUNum" Value="" Type="Decimal_with_format" MaxLen="5" Format="00000"><Desc>(PLU Number) 5 symbols for article number in format: #####</Desc></Res><Res Name="Option" Value="5" Type="OptionHardcoded" MaxLen="1" /><Res Name="PLUName" Value="" Type="Text" MaxLen="32"><Desc>32 symbols for PLU name</Desc></Res><ResFormatRaw><![CDATA[<PLUNum[5]><;><Option[\'5\']><;><PLUName[32]>]]></ResFormatRaw></Response></Command><Command Name="ReadTCP_UsedModule" CmdByte="0x4E"><FPOperation>Read the used TCP module for communication - Lan or WiFi. Command is available if the device support both modules only.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="U" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'> <;> <\'Z\'> <;> <\'U\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="U" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionUsedModule" Value="" Type="Option" MaxLen="1"><Options><Option Name="LAN" Value="1" /><Option Name="WiFi" Value="2" /></Options><Desc>(Module) 1 symbol with value:   - \'1\' - LAN   - \'2\' - WiFi</Desc></Res><ResFormatRaw><![CDATA[<\'R\'> <;> <\'Z\'> <;> <\'U\'> <;> <UsedModule[1]>]]></ResFormatRaw></Response></Command><Command Name="ProgPLUName" CmdByte="0x4B"><FPOperation>Program the price for a certain article and name.</FPOperation><Args><Arg Name="PLUNum" Value="" Type="Decimal_with_format" MaxLen="5" Format="00000"><Desc>5 symbols for article number in format: #####</Desc></Arg><Arg Name="Option" Value="5" Type="OptionHardcoded" MaxLen="1" /><Arg Name="PLUName" Value="" Type="Text" MaxLen="32"><Desc>32 symbols for PLU name</Desc></Arg><ArgsFormatRaw><![CDATA[<PLUNum[5]><;><Option[\'5\']><;><PLUName[32]>  ]]></ArgsFormatRaw></Args></Command><Command Name="PaperFeed" CmdByte="0x2B"><FPOperation>Feeds one line of paper.</FPOperation></Command><Command Name="CloseReceipt" CmdByte="0x38"><FPOperation>Close the fiscal receipt (Fiscal receipt, or Non-fical receipt). When the payment is finished.</FPOperation></Command><Command Name="PrintBarcode" CmdByte="0x51"><FPOperation>Prints barcode from type stated by CodeType and CodeLen and with data stated in CodeData field.</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionCodeType" Value="" Type="Option" MaxLen="1"><Options><Option Name="CODABAR" Value="6" /><Option Name="CODE 128" Value="I" /><Option Name="CODE 39" Value="4" /><Option Name="CODE 93" Value="H" /><Option Name="EAN 13" Value="2" /><Option Name="EAN 8" Value="3" /><Option Name="ITF" Value="5" /><Option Name="UPC A" Value="0" /><Option Name="UPC E" Value="1" /></Options><Desc>1 symbol with possible values:   - \'0\' - UPC A   - \'1\' - UPC E   - \'2\' - EAN 13   - \'3\' - EAN 8   - \'4\' - CODE 39   - \'5\' - ITF   - \'6\' - CODABAR   - \'H\' - CODE 93   - \'I\' - CODE 128</Desc></Arg><Arg Name="CodeLen" Value="" Type="Decimal" MaxLen="2"><Desc>1..2 bytes for number of bytes according to the table</Desc></Arg><Arg Name="CodeData" Value="" Type="Text" MaxLen="100"><Desc>From 0 to 255 bytes data in range according to the table</Desc></Arg><Arg Name="OptionCenter" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol in order to place the barcode in the middle:  -\'1\' - Yes  -\'0\' - No</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence=";" /></Arg><ArgsFormatRaw><![CDATA[ <\'P\'> <;> <CodeType[1]> <;> <CodeLen[1..2]> <;> <CodeData[100]> {<;><Center[1]>} ]]></ArgsFormatRaw></Args></Command><Command Name="PrintDepartmentReport" CmdByte="0x76"><FPOperation>Print a department report with or without zeroing (\'Z\' or \'X\').</FPOperation><Args><Arg Name="OptionZeroing" Value="" Type="Option" MaxLen="1"><Options><Option Name="Without zeroing" Value="X" /><Option Name="Zeroing" Value="Z" /></Options><Desc>1 symbol with value:   - \'Z\' - Zeroing   - \'X\' - Without zeroing</Desc></Arg><ArgsFormatRaw><![CDATA[ <OptionZeroing[1]> ]]></ArgsFormatRaw></Args></Command><Command Name="ProgramLanguage" CmdByte="0x4F"><FPOperation>Program the language of the device</FPOperation><Args><Arg Name="" Value="L" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="W" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionLanguage" Value="" Type="Option" MaxLen="1"><Options><Option Name="Albanian" Value="0" /><Option Name="English" Value="2" /><Option Name="Serbian" Value="1" /></Options><Desc>1 symbol with value:   - \'0\' - Albanian   - \'1\' - Serbian   - \'2\' - English</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'L\'> <;> <\'W\'> <;> < Language[1]> ]]></ArgsFormatRaw></Args></Command><Command Name="DisplayTextLine2" CmdByte="0x26"><FPOperation>Shows a 20-symbols text in the lower external display line.</FPOperation><Args><Arg Name="Text" Value="" Type="Text" MaxLen="20"><Desc>20 symbols text</Desc></Arg><ArgsFormatRaw><![CDATA[ <Text[20]> ]]></ArgsFormatRaw></Args></Command><Command Name="ManageShortReceiptSending" CmdByte="0x5A"><FPOperation>Temporary enable/disable short receipts sending</FPOperation><Args><Arg Name="Option1" Value="F" Type="OptionHardcoded" MaxLen="1" /><Arg Name="Option2" Value="W" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionActivationRS" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol with value :  - \'1\' - Yes  - \'0\' - No</Desc></Arg><ArgsFormatRaw><![CDATA[ <Option1[\'F\']> <;> <Option2[\'W\']> <;> <ActivationRS[1]>  ]]></ArgsFormatRaw></Args></Command><Command Name="ReadDailyCounters" CmdByte="0x6E"><FPOperation>Provides information about the total fiscal counters and last Z- report date and time.</FPOperation><Args><Arg Name="" Value="5" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'5\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="5" Type="OptionHardcoded" MaxLen="1" /><Res Name="TotalReciepts" Value="" Type="Decimal" MaxLen="5"><Desc>5 symbols for total number of fiscal receipts</Desc></Res><Res Name="NumLastFMBlock" Value="" Type="Decimal" MaxLen="5"><Desc>Up to 5 symbols for number of the last FM report</Desc></Res><Res Name="NumEJ" Value="" Type="Decimal" MaxLen="5"><Desc>Up to 5 symbols for number of EJ</Desc></Res><Res Name="DateTime" Value="" Type="DateTime" MaxLen="10" Format="dd-MM-yyyy HH:mm"><Desc>16 symbols for date and time of the last block storage in FM in format  "DD-MM-YYYY HH:MM"</Desc></Res><ResFormatRaw><![CDATA[<\'5\'> <;> <TotalReciepts[1..5]> <;> <NumLastFMBlock[1..5]> <;> <NumEJ[1..5]> <;> <DateTime "DD-MM-YYYY HH:MM">]]></ResFormatRaw></Response></Command><Command Name="SetWiFi_Password" CmdByte="0x4E"><FPOperation>Program device\'s WiFi network password where it will connect. To apply use - 4Eh / N - Save network settings</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="W" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="PassLength" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for the WiFi password len</Desc></Arg><Arg Name="Password" Value="" Type="Text" MaxLen="100"><Desc>Up to 100 symbols for the device\'s WiFi password</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'> <;> <\'W\'> <;> <\'P\'> <;> <PassLength[1..3]> <;> <Password[100]> ]]></ArgsFormatRaw></Args></Command><Command Name="StartTest_Bluetooth" CmdByte="0x4E"><FPOperation>Start Bluetooth test on the device and print out the result</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="B" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'> <;> <\'B\'> <;> <\'T\'> ]]></ArgsFormatRaw></Args></Command><Command Name="PrintCurrentHeader" CmdByte="0x53"><FPOperation>Print current headers and Fiscal Memory operative header</FPOperation><Args><Arg Name="" Value="1" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'1\'> ]]></ArgsFormatRaw></Args></Command><Command Name="EraseAllPLUs" CmdByte="0x4B"><FPOperation>Erase all articles in PLU database.</FPOperation><Args><Arg Name="PLUNum" Value="00000" Type="OptionHardcoded" MaxLen="5" /><Arg Name="Option" Value="$" Type="OptionHardcoded" MaxLen="1" /><Arg Name="Password" Value="" Type="Text" MaxLen="6"><Desc>6 symbols for password</Desc></Arg><ArgsFormatRaw><![CDATA[ <PLUNum[\'00000\']> <;> <Option[\'$\']> <;> <Password[6]> ]]></ArgsFormatRaw></Args></Command><Command Name="StoreCurrentHeaderInFM" CmdByte="0x53"><FPOperation>Store the header into fiscal memory.</FPOperation><Args><Arg Name="" Value="2" Type="OptionHardcoded" MaxLen="1" /><Arg Name="Password" Value="" Type="Text" MaxLen="6"><Desc>6-symbols string</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'2\'> <;> <Password[6]> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadDailyRAbyOperator" CmdByte="0x6F"><FPOperation>Provides information about the RA and the total number of operations by specified operator.</FPOperation><Args><Arg Name="" Value="2" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OperNum" Value="" Type="Decimal" MaxLen="2"><Desc>Symbols from 1 to 20 corresponding to operator\'s  number</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'2\'> <;> <OperNum[1..2]> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="2" Type="OptionHardcoded" MaxLen="1" /><Res Name="OperNum" Value="" Type="Decimal" MaxLen="2"><Desc>Symbols from 1 to 20 corresponding to operator\'s number</Desc></Res><Res Name="AmountRA_Payments" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for the RA by type of payment</Desc></Res><Res Name="NumRA" Value="" Type="Decimal" MaxLen="5"><Desc>Up to 5 symbols for the total number of operations</Desc></Res><ResFormatRaw><![CDATA[<\'2\'> <;> <OperNum[1..2]> <;> <AmountRA_Payments[1..11]> <;> <NumRA[1..5]>]]></ResFormatRaw></Response></Command><Command Name="StartTest_GPRS" CmdByte="0x4E"><FPOperation>Start GPRS test on the device and print out the result</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="G" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'> <;> <\'G\'> <;> <\'T\'> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadReceiptViewParameter" CmdByte="0x4F"><FPOperation>Read receipt view parameter</FPOperation><Args><Arg Name="" Value="F" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'F\'> <;> <\'R\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="F" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionReceiptView" Value="" Type="Option" MaxLen="1"><Options><Option Name="Shortened view of receipt" Value="1" /><Option Name="Standart view" Value="0" /></Options><Desc>1 symbol with value:   - \'0\' - Standart view   - \'1\' - Shortened view of receipt</Desc></Res><ResFormatRaw><![CDATA[<\'F\'> <;> <\'R\'> <;> <ReceiptView[1]>]]></ResFormatRaw></Response></Command><Command Name="ReadHeader" CmdByte="0x69"><FPOperation>Provides the content of the header lines.</FPOperation><Args><Arg Name="OptionHeaderLine" Value="" Type="Option" MaxLen="1"><Options><Option Name="Header 1" Value="1" /><Option Name="Header 2" Value="2" /><Option Name="Header 3" Value="3" /><Option Name="Header 4" Value="4" /><Option Name="Header 5" Value="5" /><Option Name="Header 6" Value="6" /><Option Name="Header 7" Value="7" /><Option Name="Header 8" Value="8" /></Options><Desc>1 symbol with value:   - \'1\' - Header 1   - \'2\' - Header 2   - \'3\' - Header 3   - \'4\' - Header 4   - \'5\' - Header 5   - \'6\' - Header 6   - \'7\' - Header 7   - \'8\' - Header 8</Desc></Arg><ArgsFormatRaw><![CDATA[ <OptionHeaderLine[1]> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="OptionHeaderLine" Value="" Type="Option" MaxLen="1"><Options><Option Name="Header 1" Value="1" /><Option Name="Header 2" Value="2" /><Option Name="Header 3" Value="3" /><Option Name="Header 4" Value="4" /><Option Name="Header 5" Value="5" /><Option Name="Header 6" Value="6" /><Option Name="Header 7" Value="7" /><Option Name="Header 8" Value="8" /></Options><Desc>(Line Number) 1 symbol with value:   - \'1\' - Header 1   - \'2\' - Header 2   - \'3\' - Header 3   - \'4\' - Header 4   - \'5\' - Header 5   - \'6\' - Header 6   - \'7\' - Header 7   - \'8\' - Header 8</Desc></Res><Res Name="HeaderText" Value="" Type="Text" MaxLen="64"><Desc>TextLength symbols</Desc></Res><ResFormatRaw><![CDATA[<OptionHeaderLine[1]> <;><HeaderText[TextLength]>]]></ResFormatRaw></Response></Command><Command Name="SellTaxiService" CmdByte="0x32"><FPOperation>Register the specified service from the internal FD DB.</FPOperation><Args><Arg Name="OptionSign" Value="" Type="Option" MaxLen="1"><Options><Option Name="Correction" Value="-" /><Option Name="Sale" Value="+" /></Options><Desc>1 symbol with optional value:  - \'+\' - Sale  - \'-\'  - Correction  ServiceNumber 2 symbols for Service number of FD\'s database in format ##</Desc><Meta MinLen="1" Compulsory="true" NoSemiColumnSeparatorAfterIt="true" /></Arg><Arg Name="ServiceNum" Value="" Type="Decimal_with_format" MaxLen="2" Format="00"><Desc>ber 2 symbols for Service number of FD\'s database in format ##</Desc></Arg><Arg Name="StartTime" Value="" Type="DateTime" MaxLen="10" Format="HH:MM"><Desc>in format: \'hh:mm\'</Desc></Arg><Arg Name="EndTime" Value="" Type="DateTime" MaxLen="10" Format="HH:MM"><Desc>in format: \'hh:mm\'</Desc></Arg><Arg Name="Duration" Value="" Type="Decimal" MaxLen="7"><Desc>1..7 symbols for Duration in seconds</Desc></Arg><Arg Name="Distance" Value="" Type="Decimal" MaxLen="7"><Desc>1..7 symbols for Distance in meters</Desc></Arg><Arg Name="InitialSUM" Value="" Type="Decimal" MaxLen="8"><Desc>Up to 8 symbols for Initial fee</Desc></Arg><Arg Name="TransportSUM" Value="" Type="Decimal" MaxLen="8"><Desc>Up to 8 symbols for Transport sum</Desc></Arg><Arg Name="StayMinutes" Value="" Type="Decimal" MaxLen="4"><Desc>1..4 symbols for Stay in minutes</Desc></Arg><Arg Name="StaySUM" Value="" Type="Decimal" MaxLen="8"><Desc>Up to 8 symbols for Stay sum</Desc></Arg><Arg Name="DiscAddV" Value="" Type="Decimal" MaxLen="8"><Desc>Up to 8 symbols for percentage of  discount/addition. Use minus sign \'-\' for discount</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence=":" /></Arg><ArgsFormatRaw><![CDATA[ <OptionSign[1]><ServiceNum[2]><;><StartTime "hh:mm"> <;>  <EndTime "hh:mm"><;> <Duration[1..7]> <;> <Distance[1..7]> <;> <InitialSUM[1..8]><;> <TransportSUM[1..8]><;>  <StayMinutes[1..4]><;> <StaySUM[1..8]>  {<\':\'> <DiscAddV[1..8]>} ]]></ArgsFormatRaw></Args></Command><Command Name="CutPaper" CmdByte="0x29"><FPOperation>Start paper cutter. The command works only in fiscal printer devices.</FPOperation></Command><Command Name="ReadDeviceModuleSupportByFirmware" CmdByte="0x4E"><FPOperation>Provide an information about modules supported by device\'s firmware.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="D" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'> <;> <\'D\'> <;> <\'S\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="D" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionLAN" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol for LAN support   - \'0\' - No   - \'1\' - Yes</Desc></Res><Res Name="OptionWiFi" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol for WiFi support   - \'0\' - No   - \'1\' - Yes</Desc></Res><Res Name="OptionGPRS" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol for GPRS support   - \'0\' - No   - \'1\' - Yes  BT (Bluetooth) 1 symbol for Bluetooth support   - \'0\' - No   - \'1\' - Yes</Desc></Res><Res Name="OptionBT" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>(Bluetooth) 1 symbol for Bluetooth support   - \'0\' - No   - \'1\' - Yes</Desc></Res><ResFormatRaw><![CDATA[<\'R\'> <;> <\'D\'> <;> <\'S\'> <;> <LAN[1]> <;> <WiFi[1]> <;> <GPRS[1]> <;> <BT[1]>]]></ResFormatRaw></Response></Command><Command Name="ReadWiFi_Password" CmdByte="0x4E"><FPOperation>Read device\'s connected WiFi network password</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="W" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'> <;> <\'W\'> <;> <\'P\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="W" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Res Name="PassLength" Value="" Type="Decimal" MaxLen="3"><Desc>(Length) Up to 3 symbols for the WiFi password length</Desc></Res><Res Name="Password" Value="" Type="Text" MaxLen="100"><Desc>Up to 100 symbols for the device\'s WiFi password</Desc></Res><ResFormatRaw><![CDATA[<\'R\'> <;> <\'W\'> <;> <\'P\'> <;> <PassLength[1..3]> <;> <Password[100]>]]></ResFormatRaw></Response></Command><Command Name="ProgPLUbarcode" CmdByte="0x4B"><FPOperation>Program the Barcode number for a certain article (item) from the internal database.</FPOperation><Args><Arg Name="PLUNum" Value="" Type="Decimal_with_format" MaxLen="5" Format="00000"><Desc>5 symbols for article number in format: #####</Desc></Arg><Arg Name="Option" Value="3" Type="OptionHardcoded" MaxLen="1" /><Arg Name="Barcode" Value="" Type="Text" MaxLen="13"><Desc>13 symbols for barcode</Desc></Arg><ArgsFormatRaw><![CDATA[ <PLUNum[5]><;><Option[\'3\']><;><Barcode[13]> ]]></ArgsFormatRaw></Args></Command><Command Name="PrintDetailedFMReportByDate" CmdByte="0x7A"><FPOperation>Prints a detailed FM report by initial and end date.</FPOperation><Args><Arg Name="StartDate" Value="" Type="DateTime" MaxLen="10" Format="ddMMyy"><Desc>6 symbols for initial date in the DDMMYY format</Desc></Arg><Arg Name="EndDate" Value="" Type="DateTime" MaxLen="10" Format="ddMMyy"><Desc>6 symbols for final date in the DDMMYY format</Desc></Arg><ArgsFormatRaw><![CDATA[ <StartDate "DDMMYY"><;><EndDate "DDMMYY"> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadBriefFMReportByNum" CmdByte="0x79"><FPOperation>Store a brief FM report by initial and end FM report number.</FPOperation><Args><Arg Name="StartNum" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols for the initial report number included in report, format ####</Desc></Arg><Arg Name="EndNum" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols for the final report number included in report, format ####</Desc></Arg><Arg Name="PCStorage" Value="8" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <StartNum[4]><;><EndNum[4]> <;><PCStorage[\'8\']> ]]></ArgsFormatRaw></Args><Response ACK="true" ACK_PLUS="true" /></Command><Command Name="ReadSymbolsPerLine" CmdByte="0x4F"><FPOperation>Read the number of symbols per line.</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'P\'> <;> <\'R\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="Symbols" Value="" Type="Decimal_with_format" MaxLen="2" Format="00"><Desc>2 symbols indicating a number of symbols per line in format ##</Desc></Res><ResFormatRaw><![CDATA[<\'P\'> <;> <\'R\'> <;> <Symbols[2]>]]></ResFormatRaw></Response></Command><Command Name="ReadPLUgeneral" CmdByte="0x6B"><FPOperation>Provides information about the general registers of the specified.</FPOperation><Args><Arg Name="PLUNum" Value="" Type="Decimal_with_format" MaxLen="5" Format="00000"><Desc>5 symbols for article number with leading zeroes in format: #####</Desc></Arg><Arg Name="Option" Value="1" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <PLUNum[5]> <;> <Option[\'1\']> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="PLUNum" Value="" Type="Decimal_with_format" MaxLen="5" Format="00000"><Desc>5 symbols for article number with leading zeroes in format: #####</Desc></Res><Res Name="Option" Value="1" Type="OptionHardcoded" MaxLen="1" /><Res Name="PLUName" Value="" Type="Text" MaxLen="32"><Desc>32 symbols for article name</Desc></Res><Res Name="Price" Value="" Type="Decimal" MaxLen="11"><Desc>1..11 symbols for article price</Desc></Res><Res Name="FlagsPriceQty" Value="" Type="Flags" MaxLen="1"><Desc>(Setting price, quantity, type of goods) 1 symbols with value:  Flags.7=1  Flags.6=0  Flags.5=1 Yes, Flags.5=0 No (Fractional quantity disabled)  Flags.4=1 Yes, Flags.4=0 No (Single Transaction)   Flags.3=1 Yes, Flags.3=0 No (Allow negative)  Flags.2=1 Yes, Flags.2=0 No (Monitoring quantity in stock)  Flags.1=1 Yes, Flags.1=0 No (Free price limited)  Flags.0=1 Yes, Flags.0=0 No (Free price enabled)</Desc></Res><Res Name="OptionVATClass" Value="" Type="Option" MaxLen="1"><Options><Option Name="VAT Class A" Value="A" /><Option Name="VAT Class B" Value="B" /><Option Name="VAT Class C" Value="C" /><Option Name="VAT Class D" Value="D" /><Option Name="VAT Class E" Value="E" /><Option Name="VAT Class F" Value="F" /><Option Name="VAT Class G" Value="G" /><Option Name="VAT Class H" Value="H" /></Options><Desc>1 character for article VAT Class:   - \'A\' - VAT Class A   - \'B\' - VAT Class B   - \'C\' - VAT Class C   - \'D\' - VAT Class D   - \'E\' - VAT Class E   - \'F\' - VAT Class F   - \'G\' - VAT Class G   - \'H\' - VAT Class H</Desc></Res><Res Name="BelongToDepNumber" Value="" Type="Decimal_plus_80h" MaxLen="2"><Desc>BelongToDepNo + 80h, 1 symbol for PLU department = 0x80 … 0x93</Desc></Res><Res Name="AvailableQuantity" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for quantity in stock</Desc></Res><Res Name="Barcode" Value="" Type="Text" MaxLen="13"><Desc>13 symbols for article barcode</Desc></Res><Res Name="TurnoverAmount" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for PLU accumulated turnover</Desc></Res><Res Name="SoldQuantity" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for Sales quantity of the article</Desc></Res><Res Name="RefundAmount" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for PLU accumulated refund</Desc></Res><Res Name="RefundQTY" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for number of refund quantity of PLU</Desc></Res><Res Name="LastZReportNumber" Value="" Type="Decimal" MaxLen="5"><Desc>Up to 5 symbols for the number of the last article report with zeroing</Desc></Res><Res Name="LastZReportDate" Value="" Type="DateTime" MaxLen="10" Format="dd-MM-yyyy HH:mm"><Desc>16 symbols for the date and time in format "DD-MM-YYYY HH:MM"</Desc></Res><ResFormatRaw><![CDATA[<PLUNum[5]> <;> <Option[\'1\']> <;> <PLUName[32]> <;> <Price[1..11]> <;> <FlagsPriceQty[1]> <;> <OptionVATClass[1]> <;> <BelongToDepNumber[1]> <;> <AvailableQuantity[1..11]> <;> <Barcode[13]> <;> <TurnoverAmount[1..11]> <;> <SoldQuantity[1..11]> <;><RefundAmount[1..11]><;>< RefundQTY[1..11]><;> <LastZReportNumber[1..5]> <;> <LastZReportDate "DD-MM-YYYY HH:MM">]]></ResFormatRaw></Response></Command><Command Name="ReadDailyReceivedSalesAmountsByOperator" CmdByte="0x6F"><FPOperation>Read the amounts received from sales by type of payment and specified operator.</FPOperation><Args><Arg Name="" Value="4" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OperNum" Value="" Type="Decimal" MaxLen="2"><Desc>Symbols from 1 to 20 corresponding to operator\'s  number</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'4\'> <;> <OperNum[1..2]> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="4" Type="OptionHardcoded" MaxLen="1" /><Res Name="OperNum" Value="" Type="Decimal" MaxLen="2"><Desc>Symbols from 1 to 20 corresponding to operator\'s number</Desc></Res><Res Name="AmountPayment" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for amount received from sales change by cash</Desc></Res><Res Name="AmountPaymentOthers" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for amount received from sales change by others  payment</Desc></Res><ResFormatRaw><![CDATA[<\'4\'> <;> <OperNum[1..2]> <;> <AmountPayment[1..11]> <;> <AmountPaymentOthers[1..11]>]]></ResFormatRaw></Response></Command><Command Name="CloseNonFiscReceipt" CmdByte="0x2F"><FPOperation>Closes the non-fiscal receipt.</FPOperation></Command><Command Name="PrintBriefFMReportByNum" CmdByte="0x79"><FPOperation>Print a brief FM report by initial and end FM report number.</FPOperation><Args><Arg Name="StartNum" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols for the initial FM report number included in report, format ####</Desc></Arg><Arg Name="EndNum" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols for the final FM report number included in report, format ####</Desc></Arg><ArgsFormatRaw><![CDATA[ <StartNum[4]><;><EndNum[4]> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadEJ" CmdByte="0x7C"><FPOperation>Read Electronic Journal report with all documents.</FPOperation><Args><Arg Name="" Value="J0" Type="OptionHardcoded" MaxLen="2" /><Arg Name="" Value="*" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'J0\'> <;> <\'*\'> ]]></ArgsFormatRaw></Args><Response ACK="true" ACK_PLUS="true" /></Command><Command Name="Payment" CmdByte="0x35"><FPOperation>Registers the payment in the receipt with specified type of payment and amount received.</FPOperation><Args><Arg Name="OptionPaymentType" Value="" Type="Option" MaxLen="1"><Options><Option Name="Card" Value="1" /><Option Name="Cash" Value="0" /><Option Name="Credit" Value="3" /><Option Name="Currency" Value="4" /><Option Name="Voucher" Value="2" /></Options><Desc>1 symbol with values    - \'0\' - Cash   - \'1\' - Card    - \'2\' - Voucher    - \'3\' - Credit   - \'4\' - Currency</Desc></Arg><Arg Name="OptionChange" Value="" Type="Option" MaxLen="1"><Options><Option Name="With Change" Value="0" /><Option Name="Without Change" Value="1" /></Options><Desc>Default value is 0, 1 symbol with value:   - \'0 - With Change   - \'1\' - Without Change</Desc></Arg><Arg Name="Amount" Value="" Type="Decimal" MaxLen="10"><Desc>Up to 10 characters for received amount</Desc></Arg><Arg Name="OptionChangeType" Value="" Type="Option" MaxLen="1"><Options><Option Name="Change In Cash" Value="0" /><Option Name="Change In Currency" Value="2" /><Option Name="Same As The payment" Value="1" /></Options><Desc>1 symbols with value:   - \'0\' - Change In Cash   - \'1\' - Same As The payment   - \'2\' - Change In Currency</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence="*" /></Arg><ArgsFormatRaw><![CDATA[ <PaymentType[1]> <;> <OptionChange[1]> <;> <Amount[1..10]> { <*> <OptionChangeType[1]> } ]]></ArgsFormatRaw></Args></Command><Command Name="ProgDepartmentName" CmdByte="0x47"><FPOperation>Set data for the state department number and name</FPOperation><Args><Arg Name="Option" Value="2" Type="OptionHardcoded" MaxLen="1" /><Arg Name="Number" Value="" Type="Decimal_with_format" MaxLen="2" Format="00"><Desc>2 symbols department number in format ##</Desc></Arg><Arg Name="Name" Value="" Type="Text" MaxLen="23"><Desc>23 characters department name</Desc></Arg><ArgsFormatRaw><![CDATA[ <Option[\'2\']> <;> <Number[2]> <;> <Name[23]> ]]></ArgsFormatRaw></Args></Command><Command Name="SetDeviceTCP_Addresses" CmdByte="0x4E"><FPOperation>Program device\'s network IP address, subnet mask, gateway address, DNS address. To apply use - 4Eh / N - Save network settings</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionAddressType" Value="" Type="Option" MaxLen="1"><Options><Option Name="DNS address" Value="5" /><Option Name="Gateway address" Value="4" /><Option Name="IP address" Value="2" /><Option Name="Subnet Mask" Value="3" /></Options><Desc>1 symbol with value:   - \'2\' - IP address   - \'3\' - Subnet Mask   - \'4\' - Gateway address   - \'5\' - DNS address</Desc></Arg><Arg Name="DeviceAddress" Value="" Type="Text" MaxLen="15"><Desc>15 symbols for the selected address</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'> <;> <\'T\'> <;> <AddressType[1]> <;> <DeviceAddress[15]> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadLastDailyReportInfo" CmdByte="0x73"><FPOperation>Read date and number of last Z-report and last RAM reset event.</FPOperation><Response ACK="false"><Res Name="LastZDailyReportDate" Value="" Type="DateTime" MaxLen="10" Format="dd-MM-yyyy"><Desc>10 symbols for last Z-report date in DD-MM-YYYY format</Desc></Res><Res Name="LastZDailyReportNum" Value="" Type="Decimal" MaxLen="4"><Desc>Up to 4 symbols for the number of the last daily report</Desc></Res><Res Name="LastRAMResetNum" Value="" Type="Decimal" MaxLen="4"><Desc>Up to 4 symbols for the number of the last RAM reset</Desc></Res><Res Name="TotalReceiptCounter" Value="" Type="Decimal_with_format" MaxLen="6" Format="000000"><Desc>6 symbols for total number of receipts in format ######</Desc></Res><Res Name="DateTimeLastFiscRec" Value="" Type="DateTime" MaxLen="10" Format="dd-MM-yyyy HH:mm"><Desc>Date Time parameter in format: DD-MM-YYYY HH:MM</Desc></Res><Res Name="EJNum" Value="" Type="Text" MaxLen="2"><Desc>Up to 2 symbols for number of EJ</Desc></Res><Res Name="FirstEJZreport" Value="" Type="Decimal" MaxLen="4"><Desc>Up to 4 symbols for first EJ Z-report number</Desc></Res><Res Name="LastEJZreport" Value="" Type="Decimal" MaxLen="4"><Desc>Up to 4 symbols for last EJ Z-report number</Desc></Res><ResFormatRaw><![CDATA[<LastZDailyReportDate "DD-MM-YYYY"> <;> <LastZDailyReportNum[1..4]> <;> <LastRAMResetNum[1..4]> <;> <TotalReceiptCounter[6]> <;> <DateTimeLastFiscRec "DD-MM-YYYY HH:MM"> <;> <EJNum[2]> <;> <FirstEJZreport[1..4]><;><LastEJZreport[1..4]>]]></ResFormatRaw></Response></Command><Command Name="ReadECRprofileZreportSending" CmdByte="0x4E"><FPOperation>Provides information about sending of Z report to server automatically after Z report or not.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'S\'><;><\'Z\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionSendAfterZ" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>(Send after Z report) 1 symbol with value:   - \'0\'- No   - \'1\' - Yes</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'S\'><;><\'Z\'><;><SendAfterZ[1]>]]></ResFormatRaw></Response></Command><Command Name="PrintText" CmdByte="0x37"><FPOperation>Print a free text. The command can be executed only if receipt is opened (Fiscal receipt or Non-fical receipt). In the beginning and in the end of line symbol \'#\' is printed.</FPOperation><Args><Arg Name="Text" Value="" Type="Text" MaxLen="64"><Desc>TextLength-2 symbols</Desc></Arg><ArgsFormatRaw><![CDATA[ <Text[TextLength-2]> ]]></ArgsFormatRaw></Args></Command><Command Name="PrintOperatorReport" CmdByte="0x7D"><FPOperation>Prints an operator\'s report for a specified operator (0 = all operators) with or without zeroing (\'Z\' or \'X\'). When a \'Z\' value is specified the report should include all operators.</FPOperation><Args><Arg Name="OptionZeroing" Value="" Type="Option" MaxLen="1"><Options><Option Name="Without zeroing" Value="X" /><Option Name="Zeroing" Value="Z" /></Options><Desc>with following values:   - \'Z\' - Zeroing   - \'X\' - Without zeroing</Desc></Arg><Arg Name="Number" Value="" Type="Decimal" MaxLen="2"><Desc>Symbols from 0 to 20corresponding to operator\'s number  ,0 for all operators</Desc></Arg><ArgsFormatRaw><![CDATA[ <OptionZeroing[1]> <;> <Number[1..2]> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadStatus" CmdByte="0x20"><FPOperation>Provides detailed 7-byte information about the current status of the fiscal device.</FPOperation><Response ACK="false"><Res Name="FM_Read_only" Value="" Type="Status" Byte="0" Bit="0"><Desc>FM Read only</Desc></Res><Res Name="Power_down_in_opened_fiscal_receipt" Value="" Type="Status" Byte="0" Bit="1"><Desc>Power down in opened fiscal receipt</Desc></Res><Res Name="Printer_not_ready_overheat" Value="" Type="Status" Byte="0" Bit="2"><Desc>Printer not ready - overheat</Desc></Res><Res Name="DateTime_not_set" Value="" Type="Status" Byte="0" Bit="3"><Desc>DateTime not set</Desc></Res><Res Name="DateTime_wrong" Value="" Type="Status" Byte="0" Bit="4"><Desc>DateTime wrong</Desc></Res><Res Name="RAM_reset" Value="" Type="Status" Byte="0" Bit="5"><Desc>RAM reset</Desc></Res><Res Name="Hardware_clock_error" Value="" Type="Status" Byte="0" Bit="6"><Desc>Hardware clock error</Desc></Res><Res Name="Printer_not_ready_no_paper" Value="" Type="Status" Byte="1" Bit="0"><Desc>Printer not ready - no paper</Desc></Res><Res Name="Reports_registers_Overflow" Value="" Type="Status" Byte="1" Bit="1"><Desc>Reports registers Overflow</Desc></Res><Res Name="Blocking_after_24_hours_without_report" Value="" Type="Status" Byte="1" Bit="2"><Desc>Blocking after 24 hours without report</Desc></Res><Res Name="Daily_report_is_not_zeroed" Value="" Type="Status" Byte="1" Bit="3"><Desc>Daily report is not zeroed</Desc></Res><Res Name="Article_report_is_not_zeroed" Value="" Type="Status" Byte="1" Bit="4"><Desc>Article report is not zeroed</Desc></Res><Res Name="Operator_report_is_not_zeroed" Value="" Type="Status" Byte="1" Bit="5"><Desc>Operator report is not zeroed</Desc></Res><Res Name="Non_printed_copy" Value="" Type="Status" Byte="1" Bit="6"><Desc>Non-printed copy</Desc></Res><Res Name="Opened_Non_fiscal_Receipt" Value="" Type="Status" Byte="2" Bit="0"><Desc>Opened Non-fiscal Receipt</Desc></Res><Res Name="Opened_Fiscal_Receipt" Value="" Type="Status" Byte="2" Bit="1"><Desc>Opened Fiscal Receipt</Desc></Res><Res Name="fiscal_receipt_type_1" Value="" Type="Status" Byte="2" Bit="2"><Desc>fiscal receipt type 1</Desc></Res><Res Name="fiscal_receipt_type_2" Value="" Type="Status" Byte="2" Bit="3"><Desc>fiscal receipt type 2</Desc></Res><Res Name="fiscal_receipt_type_3" Value="" Type="Status" Byte="2" Bit="4"><Desc>fiscal receipt type 3</Desc></Res><Res Name="SD_card_near_full" Value="" Type="Status" Byte="2" Bit="5"><Desc>SD card near full</Desc></Res><Res Name="SD_card_full" Value="" Type="Status" Byte="2" Bit="6"><Desc>SD card full</Desc></Res><Res Name="No_FM_module" Value="" Type="Status" Byte="3" Bit="0"><Desc>No FM module</Desc></Res><Res Name="FM_error" Value="" Type="Status" Byte="3" Bit="1"><Desc>FM error</Desc></Res><Res Name="FM_full" Value="" Type="Status" Byte="3" Bit="2"><Desc>FM full</Desc></Res><Res Name="FM_near_full" Value="" Type="Status" Byte="3" Bit="3"><Desc>FM near full</Desc></Res><Res Name="Decimal_point" Value="" Type="Status" Byte="3" Bit="4"><Desc>Decimal point (1=fract, 0=whole)</Desc></Res><Res Name="FM_fiscalized" Value="" Type="Status" Byte="3" Bit="5"><Desc>FM fiscalized</Desc></Res><Res Name="FM_produced" Value="" Type="Status" Byte="3" Bit="6"><Desc>FM produced</Desc></Res><Res Name="Printer_automatic_cutting" Value="" Type="Status" Byte="4" Bit="0"><Desc>Printer: automatic cutting</Desc></Res><Res Name="External_display_transparent_display" Value="" Type="Status" Byte="4" Bit="1"><Desc>External display: transparent display</Desc></Res><Res Name="Missing_display" Value="" Type="Status" Byte="4" Bit="3"><Desc>Missing display</Desc></Res><Res Name="Drawer_automatic_opening" Value="" Type="Status" Byte="4" Bit="4"><Desc>Drawer: automatic opening</Desc></Res><Res Name="Customer_logo_included_in_the_receipt" Value="" Type="Status" Byte="4" Bit="5"><Desc>Customer logo included in the receipt</Desc></Res><Res Name="Blocking_after_10_days_without_communication" Value="" Type="Status" Byte="4" Bit="6"><Desc>Blocking after 10 days without communication</Desc></Res><Res Name="Service_jumper" Value="" Type="Status" Byte="5" Bit="0"><Desc>Service jumper</Desc></Res><Res Name="Missing_certificates" Value="" Type="Status" Byte="5" Bit="1"><Desc>Missing certificates</Desc></Res><Res Name="Wrong_SD_card" Value="" Type="Status" Byte="5" Bit="5"><Desc>Wrong SD card</Desc></Res><Res Name="Deregistered" Value="" Type="Status" Byte="5" Bit="6"><Desc>Deregistered</Desc></Res><Res Name="No_SIM_card" Value="" Type="Status" Byte="6" Bit="0"><Desc>No SIM card</Desc></Res><Res Name="No_GPRS_Modem" Value="" Type="Status" Byte="6" Bit="1"><Desc>No GPRS Modem</Desc></Res><Res Name="No_mobile_operator" Value="" Type="Status" Byte="6" Bit="2"><Desc>No mobile operator</Desc></Res><Res Name="No_GPRS_service" Value="" Type="Status" Byte="6" Bit="3"><Desc>No GPRS service</Desc></Res><Res Name="Near_end_of_paper" Value="" Type="Status" Byte="6" Bit="4"><Desc>Near end of paper</Desc></Res><Res Name="CM_error" Value="" Type="Status" Byte="6" Bit="6"><Desc>CM error</Desc></Res><ResFormatRaw><![CDATA[<StatusBytes[7]>]]></ResFormatRaw></Response></Command><Command Name="ReadDepartmentName" CmdByte="0x67"><FPOperation>Read data for the state department number and name</FPOperation><Args><Arg Name="Option" Value="2" Type="OptionHardcoded" MaxLen="1" /><Arg Name="Number" Value="" Type="Decimal_with_format" MaxLen="2" Format="00"><Desc>2 symbols department number in format ##</Desc></Arg><ArgsFormatRaw><![CDATA[ <Option[\'2\']> <;> <Number[2]> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="Number" Value="" Type="Decimal_with_format" MaxLen="2" Format="00"><Desc>2 symbols department number in format ##</Desc></Res><Res Name="Name" Value="" Type="Text" MaxLen="23"><Desc>23 characters department name</Desc></Res><ResFormatRaw><![CDATA[<Number[2]> <;> <Name[23]>]]></ResFormatRaw></Response></Command><Command Name="OpenReceipt" CmdByte="0x30"><FPOperation>Opens a fiscal receipt assigned to the specified operator</FPOperation><Args><Arg Name="OperNum" Value="" Type="Decimal" MaxLen="2"><Desc>Symbol from 1 to 20 corresponding to operator\'s number</Desc></Arg><Arg Name="OperPass" Value="" Type="Text" MaxLen="6"><Desc>6 symbols for operator\'s password</Desc></Arg><Arg Name="reserved" Value="1" Type="OptionHardcoded" MaxLen="1" /><Arg Name="reserved" Value="0" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionPrintType" Value="" Type="Option" MaxLen="1"><Options><Option Name="Postponed printing" Value="2" /><Option Name="Step by step printing" Value="0" /></Options><Desc>1 symbol with value   - \'0\' - Step by step printing   - \'2\' - Postponed printing</Desc></Arg><ArgsFormatRaw><![CDATA[ <OperNum[1..2]> <;> <OperPass[6]>  <;> < reserved[\'1\']> <;> <reserved[\'0\']> <;> <PrintType[1]>  ]]></ArgsFormatRaw></Args></Command><Command Name="SetDateTime" CmdByte="0x48"><FPOperation>Sets the date and time and prints out the current values.</FPOperation><Args><Arg Name="DateTime" Value="" Type="DateTime" MaxLen="10" Format="dd-MM-yy HH:mm:ss"><Desc>Date Time parameter in format: DD-MM-YY HH:MM:SS</Desc></Arg><ArgsFormatRaw><![CDATA[ <DateTime "DD-MM-YY HH:MM:SS"> ]]></ArgsFormatRaw></Args></Command><Command Name="ProgDecimalPointPosition" CmdByte="0x43"><FPOperation>Stores a block containing the number format into the fiscal memory. Print the current status on the printer.</FPOperation><Args><Arg Name="Password" Value="" Type="Text" MaxLen="6"><Desc>6-symbols string</Desc></Arg><Arg Name="OptionDecimalPointPosition" Value="" Type="Option" MaxLen="1"><Options><Option Name="Fractions" Value="2" /><Option Name="Whole numbers" Value="0" /></Options><Desc>1 symbol with values:   - \'0\'- Whole numbers   - \'2\' - Fractions</Desc></Arg><ArgsFormatRaw><![CDATA[ <Password[6]> <;> <DecimalPointPosition[1]> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadTotalFiscalSums" CmdByte="0x6E"><FPOperation>Provides information about the total fiscal accumulative sums from sales</FPOperation><Args><Arg Name="" Value="7" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'7\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="7" Type="OptionHardcoded" MaxLen="1" /><Res Name="SumSalesTurnover" Value="" Type="Text" MaxLen="14"><Desc>14 s. for total grand sum of sales turnover from fiscal registration</Desc></Res><Res Name="SumSalesVAT" Value="" Type="Text" MaxLen="14"><Desc>14 s. for total VAT sum of sales from fiscal registration</Desc></Res><ResFormatRaw><![CDATA[<\'7\'> <;> <SumSalesTurnover[14]> <;> <SumSalesVAT[14]>]]></ResFormatRaw></Response></Command><Command Name="ReadPLUprice" CmdByte="0x6B"><FPOperation>Provides information about the price and price type of the specified article.</FPOperation><Args><Arg Name="PLUNum" Value="" Type="Decimal_with_format" MaxLen="5" Format="00000"><Desc>5 symbols for article number with leading zeroes in format: #####</Desc></Arg><Arg Name="Option" Value="4" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <PLUNum[5]><;><Option[\'4\']> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="PLUNum" Value="" Type="Decimal_with_format" MaxLen="5" Format="00000"><Desc>5 symbols for article number with leading zeroes in format #####</Desc></Res><Res Name="Option" Value="4" Type="OptionHardcoded" MaxLen="1" /><Res Name="Price" Value="" Type="Decimal" MaxLen="10"><Desc>1..10 symbols for article price</Desc></Res><Res Name="OptionPrice" Value="" Type="Option" MaxLen="1"><Options><Option Name="Free price is disable valid only programmed price" Value="0" /><Option Name="Free price is enable" Value="1" /><Option Name="Limited price" Value="2" /></Options><Desc>1 byte for Price flag with next value:   - \'0\'- Free price is disable valid only programmed price   - \'1\'- Free price is enable   - \'2\'- Limited price</Desc></Res><ResFormatRaw><![CDATA[<PLUNum[5]><;><Option[\'4\']><;><Price[1..10]><;><OptionPrice[1]>]]></ResFormatRaw></Response></Command><Command Name="ReadDailyReturnedAmounts" CmdByte="0x6F"><FPOperation>Read information about the amounts returned</FPOperation><Args><Arg Name="" Value="6" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OperNum" Value="" Type="Decimal" MaxLen="2"><Desc>Symbols from 1 to 20 corresponding to operator\'s  number</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'6\'> <;> <OperNum[1..2]> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="6" Type="OptionHardcoded" MaxLen="1" /><Res Name="OperNum" Value="" Type="Decimal" MaxLen="2"><Desc>Symbols from 1 to 20 corresponding to operator\'s number</Desc></Res><Res Name="AmountPayment" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for amount received from sales by cash</Desc></Res><Res Name="AmountPaymentOthers" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for amount received from sales by others payment</Desc></Res><ResFormatRaw><![CDATA[<\'6\'> <;> <OperNum[1..2]> <;> <AmountPayment[1..11]> <;> <AmountPaymentOthers[1..11]>]]></ResFormatRaw></Response></Command><Command Name="ReadOperatorNamePassword" CmdByte="0x6A"><FPOperation>Provides information about an operator\'s name and password.</FPOperation><Args><Arg Name="Number" Value="" Type="Decimal" MaxLen="2"><Desc>Symbol from 1 to 20 corresponding to the number of operator</Desc></Arg><ArgsFormatRaw><![CDATA[ <Number[1..2]> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="Number" Value="" Type="Decimal" MaxLen="2"><Desc>Symbol from 1 to 20 corresponding to the number of operator</Desc></Res><Res Name="Name" Value="" Type="Text" MaxLen="20"><Desc>20 symbols for operator\'s name</Desc></Res><Res Name="Password" Value="" Type="Text" MaxLen="4"><Desc>4 symbols for operator\'s password</Desc></Res><ResFormatRaw><![CDATA[<Number[1..2]> <;> <Name[20]> <;> <Password[4]>]]></ResFormatRaw></Response></Command><Command Name="ReadDailyCountersByOperator" CmdByte="0x6F"><FPOperation>Read the last operator\'s report number and date and time.</FPOperation><Args><Arg Name="" Value="5" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OperNum" Value="" Type="Decimal" MaxLen="2"><Desc>Symbols from 1 to 20 corresponding to  operator\'s number</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'5\'> <;> <OperNum[1..2]> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="5" Type="OptionHardcoded" MaxLen="1" /><Res Name="OperNum" Value="" Type="Decimal" MaxLen="2"><Desc>Symbols from 1 to 20 corresponding to operator\'s number</Desc></Res><Res Name="WorkOperatorsCounter" Value="" Type="Decimal" MaxLen="5"><Desc>Up to 5 symbols for number of the work operators</Desc></Res><Res Name="LastOperatorReportDateTime" Value="" Type="DateTime" MaxLen="10" Format="dd-MM-yyyy HH:mm"><Desc>16 symbols for date and time of the last operator\'s report in  format DD-MM-YYYY HH:MM</Desc></Res><ResFormatRaw><![CDATA[<\'5\'> <;> <OperNum[1..2]> <;> <WorkOperatorsCounter[1..5]> <;> <LastOperatorReportDateTime "DD-MM-YYYY HH:MM">]]></ResFormatRaw></Response></Command><Command Name="ReadPayments" CmdByte="0x64"><FPOperation>Provides information about all programmed payment types.</FPOperation><Response ACK="false"><Res Name="NamePaym0" Value="" Type="Text" MaxLen="10"><Desc>10 symbols for type 0 of payment name</Desc></Res><Res Name="NamePaym1" Value="" Type="Text" MaxLen="10"><Desc>10 symbols for type 1 of payment name</Desc></Res><Res Name="NamePaym2" Value="" Type="Text" MaxLen="10"><Desc>10 symbols for type 2 of payment name</Desc></Res><Res Name="NamePaym3" Value="" Type="Text" MaxLen="10"><Desc>10 symbols for type 3 of payment name</Desc></Res><ResFormatRaw><![CDATA[<NamePaym0[10]> <;> <NamePaym1[10]> <;> <NamePaym2[10]> <;> <NamePaym3[10]>]]></ResFormatRaw></Response></Command><Command Name="ProgPayment" CmdByte="0x44"><FPOperation>Program the name of the payment types.</FPOperation><Args><Arg Name="OptionPaymentNum" Value="" Type="Option" MaxLen="1"><Options><Option Name="Payment 0" Value="0" /><Option Name="Payment 1" Value="1" /><Option Name="Payment 2" Value="2" /><Option Name="Payment 3" Value="3" /><Option Name="Payment 4" Value="4" /></Options><Desc>1 symbol for payment type:   - \'0\' - Payment 0   - \'1\' - Payment 1   - \'2\' - Payment 2   - \'3\' - Payment 3   - \'4\' - Payment 4</Desc></Arg><Arg Name="Name" Value="" Type="Text" MaxLen="10"><Desc>10 symbols for payment type name</Desc></Arg><Arg Name="Rate" Value="" Type="Decimal_with_format" MaxLen="10" Format="0000.00000"><Desc>10 symbols for exchange rate in format: ####.#####   of the 5 th  payment type.</Desc><Meta MinLen="10" Compulsory="false" ValIndicatingPresence=";" /></Arg><ArgsFormatRaw><![CDATA[ <PaymentNum[1]> <;> <Name[10]> { <;> <Rate[10]> } ]]></ArgsFormatRaw></Args></Command><Command Name="PrintDiagnostics" CmdByte="0x22"><FPOperation>Prints out a diagnostic receipt.</FPOperation></Command><Command Name="ProgFooter" CmdByte="0x49"><FPOperation>Program the contents of a footer lines.</FPOperation><Args><Arg Name="OptionFooterLine" Value="" Type="Option" MaxLen="2"><Options><Option Name="Footer 1" Value="F1" /><Option Name="Footer 2" Value="F2" /><Option Name="Footer 3" Value="F3" /></Options><Desc>2 symbol with value:  -\'F1\' - Footer 1  -\'F2\' - Footer 2  -\'F3\' - Footer 3</Desc></Arg><Arg Name="FooterText" Value="" Type="Text" MaxLen="64"><Desc>TextLength symbols for footer line</Desc></Arg><ArgsFormatRaw><![CDATA[<OptionFooterLine[2]> <;> <FooterText[TextLength]> ]]></ArgsFormatRaw></Args></Command><Command Name="PrintLastReceiptDuplicate" CmdByte="0x3A"><FPOperation>Print a copy of the last receipt document issued</FPOperation></Command><Command Name="SetGPRS_Password" CmdByte="0x4E"><FPOperation>Program device\'s GPRS password. To apply use - SaveNetworkSettings()</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="G" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="PassLength" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for the GPRS password len</Desc></Arg><Arg Name="Password" Value="" Type="Text" MaxLen="100"><Desc>Up to 100 symbols for the device\'s GPRS password</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'><;><\'G\'><;><\'P\'><;><PassLength[1..3]><;><Password[100]> ]]></ArgsFormatRaw></Args></Command><Command Name="SoftwareReset" CmdByte="0x3F"><FPOperation>Restore default parameters of the device.</FPOperation><Args><Arg Name="Password" Value="" Type="Text" MaxLen="6"><Desc>6-symbols string</Desc></Arg><ArgsFormatRaw><![CDATA[ <Password[6]>  ]]></ArgsFormatRaw></Args></Command><Command Name="ReadTCP_Password" CmdByte="0x4E"><FPOperation>Provides information about device\'s TCP password.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="1" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'> <;> <\'Z\'> <;> <\'1\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="1" Type="OptionHardcoded" MaxLen="1" /><Res Name="PassLength" Value="" Type="Decimal" MaxLen="3"><Desc>(Length) Up to 3 symbols for the password length</Desc></Res><Res Name="Password" Value="" Type="Text" MaxLen="100"><Desc>Up to 100 symbols for the TCP password</Desc></Res><ResFormatRaw><![CDATA[<\'R\'> <;> <\'Z\'> <;> <\'1\'> <;> <PassLength[1..3]> <;> <Password[100]>]]></ResFormatRaw></Response></Command><Command Name="ProgVATrates" CmdByte="0x42"><FPOperation>Stores a block containing the values of the VAT rates into the fiscal memory. Print the values on the printer.</FPOperation><Args><Arg Name="Password" Value="" Type="Text" MaxLen="6"><Desc>6 symbols string</Desc></Arg><Arg Name="reserved" Value="0" Type="OptionHardcoded" MaxLen="1" /><Arg Name="reserved" Value="0" Type="OptionHardcoded" MaxLen="1" /><Arg Name="VATrateC" Value="" Type="Decimal_with_format" MaxLen="6" Format="00.00"><Desc>Value of VAT rate C from 6 symbols in format ##.##</Desc></Arg><Arg Name="VATrateD" Value="" Type="Decimal_with_format" MaxLen="6" Format="00.00"><Desc>Value of VAT rate D from 6 symbols in format ##.##</Desc></Arg><Arg Name="VATrateE" Value="" Type="Decimal_with_format" MaxLen="6" Format="00.00"><Desc>Value of VAT rate E from 6 symbols in format ##.##</Desc></Arg><Arg Name="VATrateF" Value="" Type="Decimal_with_format" MaxLen="6" Format="00.00"><Desc>Value of VAT rate F from 6 symbols in format ##.##</Desc></Arg><Arg Name="VATrateG" Value="" Type="Decimal_with_format" MaxLen="6" Format="00.00"><Desc>Value of VAT rate G from 6 symbols in format ##.##</Desc></Arg><Arg Name="VATrateH" Value="" Type="Decimal_with_format" MaxLen="6" Format="00.00"><Desc>Value of VAT rate H from 6 symbols in format ##.##</Desc></Arg><ArgsFormatRaw><![CDATA[ <Password[6]> <;> <reserved[\'0\']><;>< reserved[\'0\'] ><;> <VATrateC[1..6]> <;> <VATrateD[1..6]> <;> <VATrateE[1..6]> <;> < VATrateF[1..6]><;> < VATrateG[1..6]> <;> < VATrateH[1..6]> ]]></ArgsFormatRaw></Args></Command><Command Name="SetBluetooth_Status" CmdByte="0x4E"><FPOperation>Program device\'s Bluetooth module to be enabled or disabled.</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="B" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionBTstatus" Value="" Type="Option" MaxLen="1"><Options><Option Name="Disabled" Value="0" /><Option Name="Enabled" Value="1" /></Options><Desc>1 symbol with value:   - \'0\' - Disabled   - \'1\' - Enabled</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'> <;> <\'B\'> <;> <\'S\'> <;> <BTstatus[1]> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadEJByDate" CmdByte="0x7C"><FPOperation>Read Electronic Journal Report from Report initial date to report Final date.</FPOperation><Args><Arg Name="" Value="J0" Type="OptionHardcoded" MaxLen="2" /><Arg Name="" Value="D" Type="OptionHardcoded" MaxLen="1" /><Arg Name="StartRepFromDate" Value="" Type="DateTime" MaxLen="10" Format="ddMMyy"><Desc>6 symbols for initial date in the DDMMYY format</Desc></Arg><Arg Name="EndRepFromDate" Value="" Type="DateTime" MaxLen="10" Format="ddMMyy"><Desc>6 symbols for final date in the DDMMYY format</Desc></Arg><ArgsFormatRaw><![CDATA[<\'J0\'> <;> <\'D\'> <;> <StartRepFromDate"DDMMYY"> <;> <EndRepFromDate"DDMMYY"> ]]></ArgsFormatRaw></Args><Response ACK="true" ACK_PLUS="true" /></Command><Command Name="ReadPLUbarcode" CmdByte="0x6B"><FPOperation>Provides information about the barcode of the specified article.</FPOperation><Args><Arg Name="PLUNum" Value="" Type="Decimal_with_format" MaxLen="5" Format="00000"><Desc>5 symbols for article number with leading zeroes in format: #####</Desc></Arg><Arg Name="Option" Value="3" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <PLUNum[5]><;><Option[\'3\']> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="PLUNum" Value="" Type="Decimal_with_format" MaxLen="5" Format="00000"><Desc>5 symbols for article number with leading zeroes in format #####</Desc></Res><Res Name="Option" Value="3" Type="OptionHardcoded" MaxLen="1" /><Res Name="Barcode" Value="" Type="Text" MaxLen="13"><Desc>13 symbols for article barcode</Desc></Res><ResFormatRaw><![CDATA[<PLUNum[5]><;><Option[\'3\']><;><Barcode[13]>]]></ResFormatRaw></Response></Command><Command Name="ReadServerPasswordECRS" CmdByte="0x4E"><FPOperation>Provides information about the ECR\'s password</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="Q" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'> <;> <\'S\'> <;> <\'Q\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="Q" Type="OptionHardcoded" MaxLen="1" /><Res Name="ParamLength" Value="" Type="Decimal" MaxLen="2"><Desc>Up to 2 symbols for parameter length</Desc></Res><Res Name="ServerPassword" Value="" Type="Text" MaxLen="64"><Desc>Up to 64 symbols for server password</Desc></Res><ResFormatRaw><![CDATA[<\'R\'> <;> <\'S\'> <;> <\'Q\'> <;> <ParamLength[1..2]> <;> <ServerPassword[64]>]]></ResFormatRaw></Response></Command><Command Name="ProgDepartment" CmdByte="0x47"><FPOperation>Set data for the state department number from the internal FD database.</FPOperation><Args><Arg Name="Number" Value="" Type="Decimal_with_format" MaxLen="2" Format="00"><Desc>2 symbols department number in format ##</Desc></Arg><Arg Name="Name" Value="" Type="Text" MaxLen="23"><Desc>23 characters department name</Desc></Arg><Arg Name="OptionVATClass" Value="" Type="Option" MaxLen="1"><Options><Option Name="VAT Class A" Value="A" /><Option Name="VAT Class B" Value="B" /><Option Name="VAT Class C" Value="C" /><Option Name="VAT Class D" Value="D" /><Option Name="VAT Class E" Value="E" /><Option Name="VAT Class F" Value="F" /><Option Name="VAT Class G" Value="G" /><Option Name="VAT Class H" Value="H" /></Options><Desc>1 character for article VAT Class:   - \'A\' - VAT Class A   - \'B\' - VAT Class B   - \'C\' - VAT Class C   - \'D\' - VAT Class D   - \'E\' - VAT Class E   - \'F\' - VAT Class F   - \'G\' - VAT Class G   - \'H\' - VAT Class H</Desc></Arg><Arg Name="Price" Value="" Type="Decimal" MaxLen="10"><Desc>Up to 10 symbols for department price</Desc></Arg><Arg Name="FlagsPrice" Value="" Type="Flags" MaxLen="1"><Desc>1 symbol with value:  Flags.7=1  Flags.6=0  Flags.5=0  Flags.4=0  Flags.3=1 Yes, Flags.3=0 No (Fractional quantity disabled)  Flags.2=1 Yes, Flags.2=0 No (Single Transaction)  Flags.1=1 Yes, Flags.1=0 No (Free price limited)  Flags.0=1 Yes, Flags.0=0 No (Free price enabled)</Desc></Arg><ArgsFormatRaw><![CDATA[ <Number[2]> <;> <Name[23]> <;> <OptionVATClass[1]> <;> <Price[1..10]> <;> <FlagsPrice[1]> ]]></ArgsFormatRaw></Args></Command><Command Name="PrintEJByZBlocks" CmdByte="0x7C"><FPOperation>Print or store Electronic Journal Report from by number of Z report blocks.</FPOperation><Args><Arg Name="" Value="J1" Type="OptionHardcoded" MaxLen="2" /><Arg Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="StartZNum" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols for initial number report in format ####</Desc></Arg><Arg Name="EndZNum" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols for final number report in format ####</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'J1\'> <;> <\'Z\'> <;> <StartZNum[4]> <;> <EndZNum[4]> ]]></ArgsFormatRaw></Args></Command><Command Name="SetIdle_Timeout" CmdByte="0x4E"><FPOperation>Sets device\'s idle timeout setting. Set timeout for closing the connection if there is an inactivity. Maximal value - 7200, minimal value 1. 0 is for never close the connection. This option can be used only if the device has LAN or WiFi. To apply use - 4Eh / N - Save network settings</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="I" Type="OptionHardcoded" MaxLen="1" /><Arg Name="IdleTimeout" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols for Idle timeout in format ####</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'> <;> <\'Z\'> <;> <\'I\'> <;> <IdleTimeout[4]> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadTCP_AutoStartStatus" CmdByte="0x4E"><FPOperation>Read device TCP Auto Start status</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="2" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'> <;> <\'Z\'> <;> <\'2\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="2" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionTCPAutoStart" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol for TCP auto start status   - \'0\' - No   - \'1\' - Yes</Desc></Res><ResFormatRaw><![CDATA[<\'R\'> <;> <\'Z\'> <;> <\'2\'> <;> <TCPAutoStart[1]>]]></ResFormatRaw></Response></Command><Command Name="ProgramTempLanguage" CmdByte="0x4F"><FPOperation>Program the language of the device</FPOperation><Args><Arg Name="" Value="l" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="W" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionLanguage" Value="" Type="Option" MaxLen="1"><Options><Option Name="Albanian" Value="0" /><Option Name="English" Value="2" /><Option Name="Serbian" Value="1" /></Options><Desc>1 symbol with value:   - \'0\' - Albanian   - \'1\' - Serbian   - \'2\' - English</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'l\'> <;> <\'W\'> <;> < Language[1]> ]]></ArgsFormatRaw></Args></Command><Command Name="PrintLogo" CmdByte="0x6C"><FPOperation>Prints the programmed graphical logo with the stated number.</FPOperation><Args><Arg Name="Number" Value="" Type="Decimal" MaxLen="2"><Desc>Number of logo to be printed. If missing prints logo with number 0</Desc></Arg><ArgsFormatRaw><![CDATA[ <Number[1..2]> ]]></ArgsFormatRaw></Args></Command><Command Name="PrintEJByDate" CmdByte="0x7C"><FPOperation>Printing Electronic Journal Report from Report initial date to report Final date.</FPOperation><Args><Arg Name="" Value="J1" Type="OptionHardcoded" MaxLen="2" /><Arg Name="" Value="D" Type="OptionHardcoded" MaxLen="1" /><Arg Name="StartRepFromDate" Value="" Type="DateTime" MaxLen="10" Format="ddMMyy"><Desc>6 symbols for initial date in the DDMMYY format</Desc></Arg><Arg Name="EndRepFromDate" Value="" Type="DateTime" MaxLen="10" Format="ddMMyy"><Desc>6 symbols for final date in the DDMMYY format</Desc></Arg><ArgsFormatRaw><![CDATA[<\'J1\'> <;> <\'D\'> <;> <StartRepFromDate"DDMMYY"> <;> <EndRepFromDate"DDMMYY"> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadDailyGeneralRegistersByOperator" CmdByte="0x6F"><FPOperation>Read the total number of customers, discounts, additions, corrections and accumulated amounts by specified operator.</FPOperation><Args><Arg Name="" Value="1" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OperNum" Value="" Type="Decimal" MaxLen="2"><Desc>Symbols from 1 to 20 corresponding to operator\'s number</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'1\'><;><OperNum[1..2]> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="1" Type="OptionHardcoded" MaxLen="1" /><Res Name="OperNum" Value="" Type="Decimal" MaxLen="2"><Desc>Symbols from 1 to 20 corresponding to operator\'s number</Desc></Res><Res Name="FiscalReciept" Value="" Type="Decimal" MaxLen="5"><Desc>Up to 5 symbols for daily number of fiscal receipts</Desc></Res><Res Name="DiscountsNum" Value="" Type="Decimal" MaxLen="5"><Desc>Up to 5 symbols for number of discounts</Desc></Res><Res Name="DiscountsAmount" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for accumulated amount of discounts</Desc></Res><Res Name="AdditionsNum" Value="" Type="Decimal" MaxLen="5"><Desc>Up to 5 symbols for number of additions</Desc></Res><Res Name="AdditionsAmount" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for accumulated amount of additions</Desc></Res><Res Name="RefundNum" Value="" Type="Decimal" MaxLen="5"><Desc>Up to 5 symbols for number of refunds</Desc></Res><Res Name="RefundAmount" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for accumulated amount of refunds</Desc></Res><ResFormatRaw><![CDATA[<\'1\'><;><OperNum[1..2]> <;> < FiscalReciept [1..5]> <;> <DiscountsNum[1..5]> <;> <DiscountsAmount[1..11]> <;> <AdditionsNum[1..5]> <;> <AdditionsAmount[1..11]> <;><RefundNum[1..5]> <;> <RefundAmount[1..11]>]]></ResFormatRaw></Response></Command><Command Name="ReadGPRS_Password" CmdByte="0x4E"><FPOperation>Provides information about device\'s GPRS password.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="G" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'G\'><;><\'P\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="G" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Res Name="PassLength" Value="" Type="Decimal" MaxLen="3"><Desc>(Length) Up to 3 symbols for the GPRS password length</Desc></Res><Res Name="Password" Value="" Type="Text" MaxLen="100"><Desc>Up to 100 symbols for the device\'s GPRS password</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'G\'><;><\'P\'><;><PassLength[1..3]><;><Password[100]>]]></ResFormatRaw></Response></Command><Command Name="PrintDailyReport" CmdByte="0x7C"><FPOperation>Depending on the parameter prints:   daily fiscal report with zeroing and fiscal memory record, preceded by Electronic Journal report print (\'Z\');  daily fiscal report without zeroing (\'X\');</FPOperation><Args><Arg Name="OptionZeroing" Value="" Type="Option" MaxLen="1"><Options><Option Name="Without zeroing" Value="X" /><Option Name="Zeroing" Value="Z" /></Options><Desc>1 character with following values:   - \'Z\' - Zeroing   - \'X\' - Without zeroing</Desc></Arg><ArgsFormatRaw><![CDATA[ <OptionZeroing[1]> ]]></ArgsFormatRaw></Args></Command><Command Name="CloseTaxiReceipt" CmdByte="0x38"><FPOperation>Close the taxi fiscal receipt.</FPOperation><Args><Arg Name="TAXIcount" Value="" Type="Decimal" MaxLen="16"><Desc>Symbols from 1 to 16 corresponding to taxi counter</Desc></Arg><ArgsFormatRaw><![CDATA[ < TAXIcount[1..16]> ]]></ArgsFormatRaw></Args></Command><Command Name="ProgExtDisplay" CmdByte="0x46"><FPOperation>Programs the external display.</FPOperation><Args><Arg Name="Password" Value="" Type="Text" MaxLen="6"><Desc>A 6-symbol string</Desc></Arg><ArgsFormatRaw><![CDATA[ <Password[6]> <NumBytesCom1line[1]> <Com1line[8]> <NumBytesCom2line[1]> <Com2Line[8]> < NumBytesClrDis[1]> <ComClrDis[8]> <NumbytesXtrCom[1]> <ComXtrCom[1]> <FlagPrecod[1]> {<PrecodTabl[64]>} ]]></ArgsFormatRaw></Args></Command><Command Name="ReadFooter" CmdByte="0x69"><FPOperation>Provides the content of the footer lines.</FPOperation><Args><Arg Name="OptionFooterLine" Value="" Type="Option" MaxLen="2"><Options><Option Name="Footer 1" Value="F1" /><Option Name="Footer 2" Value="F2" /><Option Name="Footer 3" Value="F3" /></Options><Desc>1 symbol with value:   - \'F1\' - Footer 1   - \'F2\' - Footer 2   - \'F3\' - Footer 3</Desc></Arg><ArgsFormatRaw><![CDATA[ <OptionFooterLine[2]> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="OptionFooterLine" Value="" Type="Option" MaxLen="2"><Options><Option Name="Footer 1" Value="F1" /><Option Name="Footer 2" Value="F2" /><Option Name="Footer 3" Value="F3" /></Options><Desc>(Line Number)1 symbol with value:   - \'F1\' - Footer 1   - \'F2\' - Footer 2   - \'F3\' - Footer 3</Desc></Res><Res Name="FooterText" Value="" Type="Text" MaxLen="64"><Desc>TextLength symbols for footer line</Desc></Res><ResFormatRaw><![CDATA[<OptionFooterLine[2]> <;> <FooterText[TextLength]>]]></ResFormatRaw></Response></Command><Command Name="CashPayCloseTaxiReceipt" CmdByte="0x36"><FPOperation>Paying the exact amount in cash and close the fiscal receipt.</FPOperation><Args><Arg Name="TAXIcount" Value="" Type="Decimal" MaxLen="16"><Desc>Symbols from 1 to 16 corresponding to taxi counter</Desc></Arg><ArgsFormatRaw><![CDATA[ <TAXIcount[1..16]> ]]></ArgsFormatRaw></Args></Command><Command Name="PrintEJByZBlocksWithoutReceipts" CmdByte="0x7C"><FPOperation>Print or store Electronic Journal Report from by number of Z report blocks of current receipt.</FPOperation><Args><Arg Name="" Value="J1" Type="OptionHardcoded" MaxLen="2" /><Arg Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="StartZNum" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols for initial number report in format ####</Desc></Arg><Arg Name="EndZNum" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols for final number report in format ####</Desc></Arg><Arg Name="" Value="D" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'J1\'> <;> <\'Z\'> <;> <StartZNum[4]> <;> <EndZNum[4]> <;><\'D\'> ]]></ArgsFormatRaw></Args></Command><Command Name="OpenNonFiscalReceipt" CmdByte="0x2E"><FPOperation>Opens a non-fiscal receipt assigned to the specified operator</FPOperation><Args><Arg Name="OperNum" Value="" Type="Decimal" MaxLen="2"><Desc>Symbols from \'1\' to \'20\' corresponding to operator\'s number</Desc></Arg><Arg Name="OperPass" Value="" Type="Text" MaxLen="4"><Desc>4 symbols for operator\'s password</Desc></Arg><ArgsFormatRaw><![CDATA[ < OperNum[1..2]> <;> < OperPass[4]> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadECRprofileActiveDate" CmdByte="0x4E"><FPOperation>Provides information about active profile date - date from which the account is valid or date from which we return to account 1 in case of mReset.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="D" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'S\'><;><\'D\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="D" Type="OptionHardcoded" MaxLen="1" /><Res Name="ProfileActiveDate" Value="" Type="DateTime" MaxLen="10" Format="ddMMyyyy"><Desc>(Profile active date) 8 symbols in format DDMMYYYY</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'S\'><;><\'D\'><;><ProfileActiveDate "DDMMYYYY">]]></ResFormatRaw></Response></Command><Command Name="Subtotal" CmdByte="0x33"><FPOperation>Calculate the subtotal amount with printing and display visualization options. Provide information about values of the calculated amounts. If a percent or value discount/addition has been specified the subtotal and the discount/addition value will be printed regardless the parameter for printing.</FPOperation><Args><Arg Name="OptionPrinting" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol with value:   - \'1\' - Yes   - \'0\' - No</Desc></Arg><Arg Name="OptionDisplay" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol with value:   - \'1\' - Yes   - \'0\' - No</Desc></Arg><Arg Name="DiscAddV" Value="" Type="Decimal" MaxLen="8"><Desc>Up to 8 symbols for the value of the  discount/addition. Use minus sign \'-\' for discount</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence=":" /></Arg><Arg Name="DiscAddP" Value="" Type="Decimal" MaxLen="7"><Desc>Up to 7 symbols for the percentage value of the  discount/addition. Use minus sign \'-\' for discount</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence="," /></Arg><ArgsFormatRaw><![CDATA[ <OptionPrinting[1]> <;> <OptionDisplay[1]> {<\':\'> <DiscAddV[1..8]>} {<\',\'> <DiscAddP[1..7]>} ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="SubtotalValue" Value="" Type="Decimal" MaxLen="10"><Desc>Up to 10 symbols for the value of the subtotal amount</Desc></Res><ResFormatRaw><![CDATA[<SubtotalValue[1..10]>]]></ResFormatRaw></Response></Command><Command Name="ReadDailyRA" CmdByte="0x6E"><FPOperation>Provides information about the RA amounts by type of payment and the total number of operations.</FPOperation><Args><Arg Name="" Value="2" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'2\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="2" Type="OptionHardcoded" MaxLen="1" /><Res Name="AmountPayment" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for RA amounts</Desc></Res><Res Name="NumRA" Value="" Type="Decimal" MaxLen="5"><Desc>Up to 5 symbols for the total number of operations</Desc></Res><ResFormatRaw><![CDATA[<\'2\'> <;> <AmountPayment[1..11]> <;> <NumRA[1..5]>]]></ResFormatRaw></Response></Command><Command Name="ReadGeneralDailyRegisters" CmdByte="0x6E"><FPOperation>Provides information about the number of customers (number of fiscal receipt issued), number of discounts, additions and corrections made and the accumulated amounts.</FPOperation><Args><Arg Name="" Value="1" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'1\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="1" Type="OptionHardcoded" MaxLen="1" /><Res Name="FiscalReciept" Value="" Type="Decimal" MaxLen="5"><Desc>1..5 symbols for daily number of fiscal receipts</Desc></Res><Res Name="DiscountsNum" Value="" Type="Decimal" MaxLen="5"><Desc>Up to 5 symbols for number of discounts</Desc></Res><Res Name="DiscountsAmount" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for accumulated amount of discounts</Desc></Res><Res Name="AdditionsNum" Value="" Type="Decimal" MaxLen="5"><Desc>Up to 5 symbols for number of additions</Desc></Res><Res Name="AdditionsAmount" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for accumulated amount of additions</Desc></Res><Res Name="RefundNum" Value="" Type="Decimal" MaxLen="5"><Desc>Up to 5 symbols for number of refunds</Desc></Res><Res Name="RefundAmount" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for accumulated amount of refund operation</Desc></Res><ResFormatRaw><![CDATA[<\'1\'> <;> < FiscalReciept [1..5]> <;> <DiscountsNum[1..5]> <;> <DiscountsAmount[1..11]> <;> <AdditionsNum[1..5]> <;> <AdditionsAmount[1..11]> <;><RefundNum[1..5]> <;><RefundAmount[1..11]>]]></ResFormatRaw></Response></Command><Command Name="SetActiveLogo" CmdByte="0x23"><FPOperation>Stores in the memory the graphic file under stated number. Prints information about loaded in the printer graphic files.</FPOperation><Args><Arg Name="LogoNumber" Value="" Type="Text" MaxLen="1"><Desc>1 character value from \'0\' to \'9\' or \'?\'. The number sets the active logo  number, and the \'?\' invokes only printing of information</Desc></Arg><ArgsFormatRaw><![CDATA[ <LogoNumber[1]>  ]]></ArgsFormatRaw></Args></Command><Command Name="ReadDisplayGreetingMessage" CmdByte="0x69"><FPOperation>Provide information about the display greeting message.</FPOperation><Args><Arg Name="" Value="0" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'0\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="0" Type="OptionHardcoded" MaxLen="1" /><Res Name="DisplayGreetingText" Value="" Type="Text" MaxLen="20"><Desc>20 symbols for greeting message</Desc></Res><ResFormatRaw><![CDATA[<\'0\'> <;> <DisplayGreetingText[20]>]]></ResFormatRaw></Response></Command><Command Name="SetServerPasswordECRS" CmdByte="0x4E"><FPOperation>Program ECRS password</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="Q" Type="OptionHardcoded" MaxLen="1" /><Arg Name="ParamLength" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 2 symbols for parameter length</Desc></Arg><Arg Name="ServerPassword" Value="" Type="Text" MaxLen="64"><Desc>Up to 64 symbols for server password</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'> <;> <\'S\'> <;> <\'Q\'> <;> <ParamLength[1..3]> <;> <ServerPassword[64]> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadExternalDisplay" CmdByte="0x57"><FPOperation>Select type of display</FPOperation><Args><Arg Name="Option" Value="E" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <Option[\'E\']>  ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="Option" Value="E" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionExternalType" Value="" Type="Option" MaxLen="1"><Options><Option Name="Others" Value="0" /><Option Name="Tremol display" Value="1" /></Options><Desc>1 symbol with value:   -\'1\' -Tremol display   -\'0\' - Others</Desc></Res><ResFormatRaw><![CDATA[<Option[\'E\']> <;> <ExternalType[1]>]]></ResFormatRaw></Response></Command><Command Name="ReadBluetooth_Status" CmdByte="0x4E"><FPOperation>Providing information about if the device\'s Bluetooth module is enabled or disabled.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="B" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'> <;> <\'B\'> <;> <\'S\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="B" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionBTstatus" Value="" Type="Option" MaxLen="1"><Options><Option Name="Disabled" Value="0" /><Option Name="Enabled" Value="1" /></Options><Desc>(Status) 1 symbol with value:   - \'0\' - Disabled   - \'1\' - Enabled</Desc></Res><ResFormatRaw><![CDATA[<\'R\'> <;> <\'B\'> <;> <\'S\'> <;> <BTstatus[1]>]]></ResFormatRaw></Response></Command><Command Name="SetGPRS_Username" CmdByte="0x4E"><FPOperation>Program device\'s GPRS user name. To apply use - SaveNetworkSettings()</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="G" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="U" Type="OptionHardcoded" MaxLen="1" /><Arg Name="GPRS_Username_Len" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for the username len</Desc></Arg><Arg Name="Username" Value="" Type="Text" MaxLen="100"><Desc>Up to 100 symbols for the device\'s GPRS username</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'><;><\'G\'><;><\'U\'><;><GPRS_Username_Len[1..3]><;><Username[100]> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadTaxiServiceGeneral" CmdByte="0x6B"><FPOperation>Provides information about the general registers of the specified.</FPOperation><Args><Arg Name="ServiceNum" Value="" Type="Decimal_with_format" MaxLen="2" Format="00"><Desc>2 symbols for service number: ##</Desc></Arg><Arg Name="Option" Value="1" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ < ServiceNum [2]> <;> <Option[\'1\']> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="ServiceNum" Value="" Type="Decimal_with_format" MaxLen="2" Format="00"><Desc>2 symbols for service number with leading zeroes in format: ##</Desc></Res><Res Name="Option" Value="1" Type="OptionHardcoded" MaxLen="1" /><Res Name="ServiceNameAL" Value="" Type="Text" MaxLen="30"><Desc>30 symbols for service name in Albanian</Desc></Res><Res Name="OptionVATClass" Value="" Type="Option" MaxLen="1"><Options><Option Name="VAT Class A" Value="A" /><Option Name="VAT Class B" Value="B" /><Option Name="VAT Class C" Value="C" /><Option Name="VAT Class D" Value="D" /><Option Name="VAT Class E" Value="E" /><Option Name="VAT Class F" Value="F" /><Option Name="VAT Class G" Value="G" /><Option Name="VAT Class H" Value="H" /></Options><Desc>1 character for article VAT Class:   - \'A\' - VAT Class A   - \'B\' - VAT Class B   - \'C\' - VAT Class C   - \'D\' - VAT Class D   - \'E\' - VAT Class E   - \'F\' - VAT Class F   - \'G\' - VAT Class G   - \'H\' - VAT Class H</Desc></Res><Res Name="TurnoverAmount" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for taxi service turnover</Desc></Res><Res Name="SoldQuantity" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for Sales quantity of the taxi service</Desc></Res><ResFormatRaw><![CDATA[< ServiceNum [2]> <;> <Option[\'1\']> <;> < ServiceNameAL[30]> <;> ServiceNameSR[30]> <;> ServiceNameEN[30]> <;> <OptionVATClass[1]> <;> <TurnoverAmount[1..11]> <;> <SoldQuantity[1..11]>]]></ResFormatRaw></Response></Command><Command Name="ProgPLUNameDifferent" CmdByte="0x4B"><FPOperation>Program the price for a certain article and specific name.</FPOperation><Args><Arg Name="PLUNum" Value="" Type="Decimal_with_format" MaxLen="5" Format="00000"><Desc>5 symbols for article number in format: #####</Desc></Arg><Arg Name="Option" Value="6" Type="OptionHardcoded" MaxLen="1" /><Arg Name="PLUNameAlbanian" Value="" Type="Text" MaxLen="32"><Desc>32 symbols for Albanian PLU</Desc></Arg><Arg Name="PLUNameSerbian" Value="" Type="Text" MaxLen="32"><Desc>32 symbols for Serbian PLU</Desc></Arg><Arg Name="PLUNameEnglish" Value="" Type="Text" MaxLen="32"><Desc>32 symbols for English PLU</Desc></Arg><ArgsFormatRaw><![CDATA[<PLUNum[5]><;><Option[\'6\']><;><PLUNameAlbanian[32]><;> <PLUNameSerbian[32]><;>< PLUNameEnglish[32]> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadDeviceModuleSupport" CmdByte="0x4E"><FPOperation>Provide an information about modules supported by the device.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="D" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="D" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'> <;> <\'D\'> <;> <\'D\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="D" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="D" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionLAN" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol for LAN support   - \'0\' - No   - \'1\' - Yes</Desc></Res><Res Name="OptionWiFi" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol for WiFi support   - \'0\' - No   - \'1\' - Yes</Desc></Res><Res Name="OptionGPRS" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol for GPRS support   - \'0\' - No   - \'1\' - Yes  BT (Bluetooth) 1 symbol for Bluetooth support   - \'0\' - No   - \'1\' - Yes</Desc></Res><Res Name="OptionBT" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>(Bluetooth) 1 symbol for Bluetooth support   - \'0\' - No   - \'1\' - Yes</Desc></Res><ResFormatRaw><![CDATA[<\'R\'> <;> <\'D\'> <;> <\'D\'> <;> <LAN[1]> <;> <WiFi[1]> <;> <GPRS[1]> <;> <BT[1]>]]></ResFormatRaw></Response></Command><Command Name="ReadWiFi_NetworkName" CmdByte="0x4E"><FPOperation>Read device\'s connected WiFi network name</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="W" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="N" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'> <;> <\'W\'> <;> <\'N\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="W" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="N" Type="OptionHardcoded" MaxLen="1" /><Res Name="WiFiNameLength" Value="" Type="Decimal" MaxLen="3"><Desc>(Length) Up to 3 symbols for the WiFi name length</Desc></Res><Res Name="WiFiNetworkName" Value="" Type="Text" MaxLen="100"><Desc>(Name) Up to 100 symbols for the device\'s WiFi network name</Desc></Res><ResFormatRaw><![CDATA[<\'R\'> <;> <\'W\'> <;> <\'N\'> <;> <WiFiNameLength[1..3]> <;> <WiFiNetworkName[100]>]]></ResFormatRaw></Response></Command><Command Name="ReadParameters" CmdByte="0x65"><FPOperation>Provides information about the programmed number of POS and the current values of the logo, cutting permission, display mode, enable/disable currency in receipt.</FPOperation><Response ACK="false"><Res Name="POSNum" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>(POS Number) 4 symbols for number of POS in format ####</Desc></Res><Res Name="OptionPrintLogo" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>(Print Logo) 1 symbol of value:   - \'1\' - Yes   - \'0\' - No</Desc></Res><Res Name="OptionAutoOpenDrawer" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>(Auto Open Drawer) 1 symbol of value:   - \'1\' - Yes   - \'0\' - No</Desc></Res><Res Name="OptionAutoCut" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>(Auto Cut) 1 symbol of value:   - \'1\' - Yes   - \'0\' - No</Desc></Res><Res Name="OptionExternalDispManagement" Value="" Type="Option" MaxLen="1"><Options><Option Name="Auto" Value="0" /><Option Name="Manual" Value="1" /></Options><Desc>(External Display Management) 1 symbol of value:   - \'1\' - Manual   - \'0\' - Auto</Desc></Res><Res Name="OptionWorkOperatorCount" Value="" Type="Option" MaxLen="1"><Options><Option Name="More" Value="0" /><Option Name="One" Value="1" /></Options><Desc>(Work Operator Count) 1 symbol of value:   - \'1\' - One   - \'0\' - More</Desc></Res><ResFormatRaw><![CDATA[<POSNum[4]> <;> <PrintLogo[1]> <;> <AutoOpenDrawer[1]> <;> <AutoCut[1]> <;> <ExternalDispManagement[1]> <;> <WorkOperatorCount[1]>]]></ResFormatRaw></Response></Command><Command Name="ReadVersion" CmdByte="0x21"><FPOperation>Provides information about the device model and version.</FPOperation><Response ACK="false"><Res Name="Model" Value="" Type="Text" MaxLen="50"><Desc>Up to 50 symbols for Model name</Desc></Res><Res Name="Version" Value="" Type="Text" MaxLen="20"><Desc>Up to 20 symbols for Version name and Check sum</Desc></Res><ResFormatRaw><![CDATA[<Model[50]> <;> <Version[20]>]]></ResFormatRaw></Response></Command><Command Name="RawWrite" CmdByte="0xFE"><FPOperation> Writes raw bytes to FP </FPOperation><Args><Arg Name="Bytes" Value="" Type="Base64" MaxLen="5000"><Desc>The bytes in BASE64 ecoded string to be written to FP</Desc></Arg></Args></Command><Command Name="CashPayCloseReceipt" CmdByte="0x36"><FPOperation>Paying the exact amount in cash and close the fiscal receipt.</FPOperation></Command><Command Name="ProgDisplayGreetingMessage" CmdByte="0x49"><FPOperation>Program the contents of a Display Greeting message.</FPOperation><Args><Arg Name="" Value="0" Type="OptionHardcoded" MaxLen="1" /><Arg Name="DisplayGreetingText" Value="" Type="Text" MaxLen="20"><Desc>20 symbols for Display greeting message</Desc></Arg><ArgsFormatRaw><![CDATA[<\'0\'> <;> <DisplayGreetingText[20]> ]]></ArgsFormatRaw></Args></Command><Command Name="ReadDailyPO" CmdByte="0x6E"><FPOperation>Provides information about the PO amounts by type of payment and the total number of operations.</FPOperation><Args><Arg Name="" Value="3" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'3\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="3" Type="OptionHardcoded" MaxLen="1" /><Res Name="AmountPayment" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for PO amount by type of payment</Desc></Res><Res Name="NumPO" Value="" Type="Decimal" MaxLen="5"><Desc>Up to 5 symbols for the total number of operations</Desc></Res><ResFormatRaw><![CDATA[<\'3\'> <;> <AmountPayment[1..11]> <;> <NumPO[1..5]> <;>]]></ResFormatRaw></Response></Command><Command Name="ReadDepartmentOption1" CmdByte="0x67"><FPOperation>Read data for the state department number from the internal FD database.</FPOperation><Args><Arg Name="Option" Value="1" Type="OptionHardcoded" MaxLen="1" /><Arg Name="Number" Value="" Type="Decimal_with_format" MaxLen="2" Format="00"><Desc>2 symbols department number in format ##</Desc></Arg><ArgsFormatRaw><![CDATA[ <Option[\'1\']> <;> <Number[2]>  ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="Number" Value="" Type="Decimal_with_format" MaxLen="2" Format="00"><Desc>2 symbols department number in format ##</Desc></Res><Res Name="Name" Value="" Type="Text" MaxLen="23"><Desc>23 characters department name</Desc></Res><Res Name="OptionVATClass" Value="" Type="Option" MaxLen="1"><Options><Option Name="VAT Class A" Value="A" /><Option Name="VAT Class B" Value="B" /><Option Name="VAT Class C" Value="C" /><Option Name="VAT Class D" Value="D" /><Option Name="VAT Class E" Value="E" /><Option Name="VAT Class F" Value="F" /><Option Name="VAT Class G" Value="G" /><Option Name="VAT Class H" Value="H" /></Options><Desc>1 character for article VAT Class:   - \'A\' - VAT Class A   - \'B\' - VAT Class B   - \'C\' - VAT Class C   - \'D\' - VAT Class D   - \'E\' - VAT Class E   - \'F\' - VAT Class F   - \'G\' - VAT Class G   - \'H\' - VAT Class H</Desc></Res><Res Name="Price" Value="" Type="Decimal" MaxLen="10"><Desc>Up to 10 symbols for department price</Desc></Res><Res Name="FlagsPrice" Value="" Type="Flags" MaxLen="1"><Desc>(Setting price, type of goods) 1 symbol with value:  Flags.7=1  Flags.6=0  Flags.5=0  Flags.4=0  Flags.3=1 Yes, Flags.3=0 No (Fractional quantity disabled)  Flags.2=1 Yes, Flags.2=0 No (Single Transaction)  Flags.1=1 Yes, Flags.1=0 No (Free price limited)  Flags.0=1 Yes, Flags.0=0 No (Free price enabled)</Desc></Res><Res Name="Turnover" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for accumulated turnover of the department</Desc></Res><Res Name="SoldQuantity" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for sold quantity of the department</Desc></Res><Res Name="RefundAmount" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for accumulated refund amount of the department</Desc></Res><Res Name="RefundQTY" Value="" Type="Decimal" MaxLen="11"><Desc>Up to 11 symbols for accumulated refund quantity of department</Desc></Res><Res Name="LastZReportNumber" Value="" Type="Decimal_with_format" MaxLen="5" Format="00000"><Desc>Up to 5 symbols for the number of last Z report in format #####</Desc></Res><Res Name="LastZReportDate" Value="" Type="DateTime" MaxLen="10" Format="dd-MM-yyyy HH:mm"><Desc>16 symbols for the date and hour in last Z report</Desc></Res><ResFormatRaw><![CDATA[<Number[2]> <;> <Name[23]> <;> <OptionVATClass[1]> <;> <Price[1..10]> <;> <FlagsPrice[1]> <;> <Turnover[1..11]> <;> <SoldQuantity[1..11]> <;> <RefundAmount[1..11]> <;> <RefundQTY[1..11]> <;> <LastZReportNumber[1..5]> <;> <LastZReportDate"DD-MM-YYYY HH:MM">]]></ResFormatRaw></Response></Command><Command Name="ReadBriefFMReportByDate" CmdByte="0x7B"><FPOperation>Store a brief FM report by initial and end date.</FPOperation><Args><Arg Name="StartDate" Value="" Type="DateTime" MaxLen="10" Format="ddMMyy"><Desc>6 symbols for initial date in the DDMMYY format</Desc></Arg><Arg Name="EndDate" Value="" Type="DateTime" MaxLen="10" Format="ddMMyy"><Desc>6 symbols for final date in the DDMMYY format</Desc></Arg><Arg Name="PCStorage" Value="8" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <StartDate "DDMMYY"><;><EndDate "DDMMYY"> <;><PCStorage[\'8\']> ]]></ArgsFormatRaw></Args><Response ACK="true" ACK_PLUS="true" /></Command><Command Name="ReadDetailedFMReportByDate" CmdByte="0x7A"><FPOperation>Storage a detailed FM report by initial and end date.</FPOperation><Args><Arg Name="StartDate" Value="" Type="DateTime" MaxLen="10" Format="ddMMyy"><Desc>6 symbols for initial date in the DDMMYY format</Desc></Arg><Arg Name="EndDate" Value="" Type="DateTime" MaxLen="10" Format="ddMMyy"><Desc>6 symbols for final date in the DDMMYY format</Desc></Arg><Arg Name="PCStorage" Value="8" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <StartDate "DDMMYY"><;><EndDate "DDMMYY"> <;><PCStorage[\'8\']> ]]></ArgsFormatRaw></Args><Response ACK="true" ACK_PLUS="true" /></Command></Defs>';
	return this.ServerSendDefs(defs);
}

Tremol.Enums = Tremol.Enums || {
	/**
	 * @typedef {Tremol.Enums.OptionZeroing} Tremol.Enums.OptionZeroing
	 * @readonly
	 * @enum
	 */
	OptionZeroing: {
		Without_zeroing: 'X',
		Zeroing: 'Z'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionDecimalPointPosition} Tremol.Enums.OptionDecimalPointPosition
	 * @readonly
	 * @enum
	 */
	OptionDecimalPointPosition: {
		Fractions: '2',
		Whole_numbers: '0'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionPrintLogo} Tremol.Enums.OptionPrintLogo
	 * @readonly
	 * @enum
	 */
	OptionPrintLogo: {
		No: '0',
		Yes: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionAutoOpenDrawer} Tremol.Enums.OptionAutoOpenDrawer
	 * @readonly
	 * @enum
	 */
	OptionAutoOpenDrawer: {
		No: '0',
		Yes: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionAutoCut} Tremol.Enums.OptionAutoCut
	 * @readonly
	 * @enum
	 */
	OptionAutoCut: {
		No: '0',
		Yes: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionExternalDispManagement} Tremol.Enums.OptionExternalDispManagement
	 * @readonly
	 * @enum
	 */
	OptionExternalDispManagement: {
		Auto: '0',
		Manual: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionWorkOperatorCount} Tremol.Enums.OptionWorkOperatorCount
	 * @readonly
	 * @enum
	 */
	OptionWorkOperatorCount: {
		More: '0',
		One: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionVATClass} Tremol.Enums.OptionVATClass
	 * @readonly
	 * @enum
	 */
	OptionVATClass: {
		VAT_Class_A: 'A',
		VAT_Class_B: 'B',
		VAT_Class_C: 'C',
		VAT_Class_D: 'D',
		VAT_Class_E: 'E',
		VAT_Class_F: 'F',
		VAT_Class_G: 'G',
		VAT_Class_H: 'H'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionLineSymbols} Tremol.Enums.OptionLineSymbols
	 * @readonly
	 * @enum
	 */
	OptionLineSymbols: {
		Symbols_per_line_32: '0',
		Symbols_per_line_48: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionCommunicationModule} Tremol.Enums.OptionCommunicationModule
	 * @readonly
	 * @enum
	 */
	OptionCommunicationModule: {
		GSM: '0',
		LAN: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionSign} Tremol.Enums.OptionSign
	 * @readonly
	 * @enum
	 */
	OptionSign: {
		Correction: '-',
		Sale: '+'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionLanguage} Tremol.Enums.OptionLanguage
	 * @readonly
	 * @enum
	 */
	OptionLanguage: {
		Albanian: '0',
		English: '2',
		Serbian: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionPaymentType} Tremol.Enums.OptionPaymentType
	 * @readonly
	 * @enum
	 */
	OptionPaymentType: {
		Card: '1',
		Cash: '0',
		Credit: '3',
		Currency: '4',
		Voucher: '2'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionQuantityType} Tremol.Enums.OptionQuantityType
	 * @readonly
	 * @enum
	 */
	OptionQuantityType: {
		Availability_of_PLU_stock_is_not_monitored: '0',
		Disable_negative_quantity: '1',
		Enable_negative_quantity: '2'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionIsReceiptOpened} Tremol.Enums.OptionIsReceiptOpened
	 * @readonly
	 * @enum
	 */
	OptionIsReceiptOpened: {
		No: '0',
		Yes: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionInitiatedPayment} Tremol.Enums.OptionInitiatedPayment
	 * @readonly
	 * @enum
	 */
	OptionInitiatedPayment: {
		initiated_payment: '1',
		not_initiated_payment: '0'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionFinalizedPayment} Tremol.Enums.OptionFinalizedPayment
	 * @readonly
	 * @enum
	 */
	OptionFinalizedPayment: {
		finalized_payment: '1',
		not_finalized_payment: '0'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionPowerDownInReceipt} Tremol.Enums.OptionPowerDownInReceipt
	 * @readonly
	 * @enum
	 */
	OptionPowerDownInReceipt: {
		No: '0',
		Yes: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionChangeType} Tremol.Enums.OptionChangeType
	 * @readonly
	 * @enum
	 */
	OptionChangeType: {
		Change_In_Cash: '0',
		Change_In_Currency: '2',
		Same_As_The_payment: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionExternalDisplay} Tremol.Enums.OptionExternalDisplay
	 * @readonly
	 * @enum
	 */
	OptionExternalDisplay: {
		Others: '0',
		Tremol_display: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionActivationRS} Tremol.Enums.OptionActivationRS
	 * @readonly
	 * @enum
	 */
	OptionActivationRS: {
		No: '0',
		Yes: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionServiceMode} Tremol.Enums.OptionServiceMode
	 * @readonly
	 * @enum
	 */
	OptionServiceMode: {
		Sales_mode: '0',
		Service_mode: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionDhcpStatus} Tremol.Enums.OptionDhcpStatus
	 * @readonly
	 * @enum
	 */
	OptionDhcpStatus: {
		Disabled: '0',
		Enabled: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionReceiptView} Tremol.Enums.OptionReceiptView
	 * @readonly
	 * @enum
	 */
	OptionReceiptView: {
		Shortened_view_of_receipt: '1',
		Standart_view: '0'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionPrice} Tremol.Enums.OptionPrice
	 * @readonly
	 * @enum
	 */
	OptionPrice: {
		Free_price_is_disable_valid_only_programmed_price: '0',
		Free_price_is_enable: '1',
		Limited_price: '2'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionAddressType} Tremol.Enums.OptionAddressType
	 * @readonly
	 * @enum
	 */
	OptionAddressType: {
		DNS_address: '5',
		Gateway_address: '4',
		IP_address: '2',
		Subnet_Mask: '3'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionProfileType} Tremol.Enums.OptionProfileType
	 * @readonly
	 * @enum
	 */
	OptionProfileType: {
		Profile_0: '0',
		Profile_1: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionHeaderLine} Tremol.Enums.OptionHeaderLine
	 * @readonly
	 * @enum
	 */
	OptionHeaderLine: {
		Header_1: '1',
		Header_2: '2',
		Header_3: '3',
		Header_4: '4',
		Header_5: '5',
		Header_6: '6',
		Header_7: '7',
		Header_8: '8'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionDiagnostics} Tremol.Enums.OptionDiagnostics
	 * @readonly
	 * @enum
	 */
	OptionDiagnostics: {
		Crypto_modul: 'C',
		FM: 'F',
		SD_card: 'S'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionTCPAutoStart} Tremol.Enums.OptionTCPAutoStart
	 * @readonly
	 * @enum
	 */
	OptionTCPAutoStart: {
		No: '0',
		Yes: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionUsedModule} Tremol.Enums.OptionUsedModule
	 * @readonly
	 * @enum
	 */
	OptionUsedModule: {
		LAN: '1',
		WiFi: '2'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionCodeType} Tremol.Enums.OptionCodeType
	 * @readonly
	 * @enum
	 */
	OptionCodeType: {
		CODABAR: '6',
		CODE_128: 'I',
		CODE_39: '4',
		CODE_93: 'H',
		EAN_13: '2',
		EAN_8: '3',
		ITF: '5',
		UPC_A: '0',
		UPC_E: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionCenter} Tremol.Enums.OptionCenter
	 * @readonly
	 * @enum
	 */
	OptionCenter: {
		No: '0',
		Yes: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionLAN} Tremol.Enums.OptionLAN
	 * @readonly
	 * @enum
	 */
	OptionLAN: {
		No: '0',
		Yes: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionWiFi} Tremol.Enums.OptionWiFi
	 * @readonly
	 * @enum
	 */
	OptionWiFi: {
		No: '0',
		Yes: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionGPRS} Tremol.Enums.OptionGPRS
	 * @readonly
	 * @enum
	 */
	OptionGPRS: {
		No: '0',
		Yes: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionBT} Tremol.Enums.OptionBT
	 * @readonly
	 * @enum
	 */
	OptionBT: {
		No: '0',
		Yes: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionChange} Tremol.Enums.OptionChange
	 * @readonly
	 * @enum
	 */
	OptionChange: {
		With_Change: '0',
		Without_Change: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionSendAfterZ} Tremol.Enums.OptionSendAfterZ
	 * @readonly
	 * @enum
	 */
	OptionSendAfterZ: {
		No: '0',
		Yes: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionPrintType} Tremol.Enums.OptionPrintType
	 * @readonly
	 * @enum
	 */
	OptionPrintType: {
		Postponed_printing: '2',
		Step_by_step_printing: '0'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionPaymentNum} Tremol.Enums.OptionPaymentNum
	 * @readonly
	 * @enum
	 */
	OptionPaymentNum: {
		Payment_0: '0',
		Payment_1: '1',
		Payment_2: '2',
		Payment_3: '3',
		Payment_4: '4'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionFooterLine} Tremol.Enums.OptionFooterLine
	 * @readonly
	 * @enum
	 */
	OptionFooterLine: {
		Footer_1: 'F1',
		Footer_2: 'F2',
		Footer_3: 'F3'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionBTstatus} Tremol.Enums.OptionBTstatus
	 * @readonly
	 * @enum
	 */
	OptionBTstatus: {
		Disabled: '0',
		Enabled: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionPrinting} Tremol.Enums.OptionPrinting
	 * @readonly
	 * @enum
	 */
	OptionPrinting: {
		No: '0',
		Yes: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionDisplay} Tremol.Enums.OptionDisplay
	 * @readonly
	 * @enum
	 */
	OptionDisplay: {
		No: '0',
		Yes: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionExternalType} Tremol.Enums.OptionExternalType
	 * @readonly
	 * @enum
	 */
	OptionExternalType: {
		Others: '0',
		Tremol_display: '1'
	}
};