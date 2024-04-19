const MAX_ROW_LEN = 113;  // for md
const TAB_SPACE = '    ';
const IMPORT_ANALYTICS_DF = 'from analyticsdf.analyticsdataframe import AnalyticsDataframe';
const IMPORT_NUMPY = 'import numpy as np';
const IMPORT_DATETIME = 'from datetime import datetime';
const ADDRESS_LIST = [
    {
        address: "123 Main St",
        city: "New York",
        state: "New York"
    },
    {
        address: "456 Oak St",
        city: "Los Angeles",
        state: "California"
    },
    {
        address: "789 Elm St",
        city: "Chicago",
        state: "Illinois"
    },
    {
        address: "101 Maple Ave",
        city: "Houston",
        state: "Texas"
    },
    {
        address: "222 Cedar Rd",
        city: "Phoenix",
        state: "Arizona"
    },
    {
        address: "333 Pine St",
        city: "Philadelphia",
        state: "Pennsylvania"
    },
    {
        address: "444 Birch Rd",
        city: "San Antonio",
        state: "Texas"
    },
    {
        address: "555 Walnut St",
        city: "San Diego",
        state: "California"
    },
    {
        address: "666 Willow Ave",
        city: "Dallas",
        state: "Texas"
    },
    {
        address: "777 Spruce Rd",
        city: "San Jose",
        state: "California"
    }
];
const NAME_LIST = ['Mary', 'Tom', 'Jerry', 'Mike', 'David', 'Jack', 'Helen', 'Nancy', 'Lily', 'John'];

export const FIELD_TYPE_LIST = {
    ADDRESS_ADDRESS: 'ADDRESS_ADDRESS',
    ADDRESS_CITY: 'ADDRESS_CITY',
    ADDRESS_STATE: 'ADDRESS_STATE',
    BETA: 'BETA',
    CATEGORICAL: 'CATEGORICAL',
    CATEGORICAL_TO_NUMERICAL: 'CATEGORICAL_TO_NUMERICAL',
    MULTICOLLINEAR: 'MULTICOLLINEAR',
    MULTIVARIATE_NORMAL: 'MULTIVARIATE_NORMAL',
    NAME: 'NAME',
    ADDRESS: 'ADDRESS',
    DATE: 'DATE',
    POLYNOMIAL_CATEGORICAL: 'POLYNOMIAL_CATEGORICAL',
    RESPONSE_VECTOR_LINEAR: 'RESPONSE_VECTOR_LINEAR',
    RESPONSE_VECTOR_POLYNOMIAL: 'RESPONSE_VECTOR_POLYNOMIAL',
    UNIFORM: 'UNIFORM',
    UNIQUE_IDENTIFIER: 'UNIQUE_IDENTIFIER',
};
export const RESPONSE_VECTOR_TYPE_PRE = 'RESPONSE_VECTOR_';
export const CATEGORY_TYPE_LIST = [FIELD_TYPE_LIST.NAME, FIELD_TYPE_LIST.ADDRESS_ADDRESS, FIELD_TYPE_LIST.ADDRESS_CITY, FIELD_TYPE_LIST.ADDRESS_STATE, FIELD_TYPE_LIST.CATEGORICAL];
export const NUMERIC_TYPE_LIST = [FIELD_TYPE_LIST.UNIFORM, FIELD_TYPE_LIST.MULTIVARIATE_NORMAL, FIELD_TYPE_LIST.CATEGORICAL_TO_NUMERICAL, FIELD_TYPE_LIST.MULTICOLLINEAR, FIELD_TYPE_LIST.BETA];

/**
 * Boolean => Boolean in python(capitalize)
 *
 * @param bool boolean | string
 * @return {string}
 */
const booleanString = (bool = false) => {
    const str = String(bool);
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Number Array => array string
 *
 * @param arr (number | string)[]
 * @return {string}
 */
const numberArray = (arr = []) => {
    let arrStr = [];
    for (let item of arr) {
        arrStr.push(Number(item) || 0);
    }
    return `[${arrStr.join(', ')}]`;
};

/**
 * 2D Number Array => array string
 *
 * @param arr (number | string)[][]
 * @param prefixLen number, character number before first [
 * @return {string}
 */
const numberArray2Dim = (arr = [], prefixLen = 0) => {
    const space = prefixLen + 1;  // plus 1 for the first [
    let arrStr = [];
    for (let arrItem of arr) {
        arrStr.push(numberArray(arrItem));
    }
    return `[${arrStr.join(`,\n${' '.repeat(space)}`)}]`;
};

/**
 * String Array => array string, add "" for every element
 *
 * @param arr any[]
 * @return {string}
 */
const stringArray = (arr = []) => {
    let arrStr = [];
    for (let item of arr) {
        arrStr.push(`"${item || ''}"`);
    }
    return `[${arrStr.join(', ')}]`;
};

/**
 * Object => object string, {"key": value}
 *
 * @param mapping {key: value}
 * @param valType string, 'string' | 'number'
 * @return {string}
 */
const mappingObject = (mapping = {}, valType = 'number') => {
    const defaultVal = {
        number: 0,
        string: '""'
    };
    let objStr = [];
    for (let key of Object.keys(mapping)) {
        objStr.push(`"${key || ""}": ${mapping[key] || defaultVal[valType]}`);
    }
    return `{${objStr.join(', ')}}`;
};

/**
 * normalize the number array
 *
 * @param arr number[]
 * @return {number[]}
 */
const normalize = (arr = [1]) => {
    const sum = arr.reduce((acc, val) => acc + val, 0);
    arr = arr.map(val => parseFloat((val / sum).toFixed(2)));

    const sumWithoutEnd = arr.reduce((acc, val, idx) => (idx < arr.length - 1) ? (acc + val) : acc, 0);
    arr[arr.length - 1] = (1 - sumWithoutEnd).toFixed(2);

    return arr;
}

/**
 * generate names randomly for categorical predictor
 *
 * @return {{categoryNames: *[], probVector: number[]}}
 */
const randomName = () => {
    const n = Math.floor(Math.random() * (4 - 2)) + 2;

    let categoryNames = [];
    for (let i = 0; i < n; i++) {
        let name = NAME_LIST[Math.floor(Math.random() * NAME_LIST.length)];
        while (categoryNames.includes(name)) {
            name = NAME_LIST[Math.floor(Math.random() * NAME_LIST.length)];
        }
        categoryNames.push(name);
    }

    let probVector = normalize(Array.from({length: n}, () => Math.random()));
    return {categoryNames, probVector};
};

/**
 * generate addresses randomly for categorical predictor
 *
 * @return {{categoryNames: *[], probVector: number[]}}
 */
const randomAddress = () => {
    const n = Math.floor(Math.random() * (4 - 2)) + 2;

    let categoryNames = [];
    for (let i = 0; i < n; i++) {
        let address = ADDRESS_LIST[Math.floor(Math.random() * ADDRESS_LIST.length)];
        while (categoryNames.map(item => item.address).includes(address.address)) {
            address = ADDRESS_LIST[Math.floor(Math.random() * ADDRESS_LIST.length)];
        }
        categoryNames.push(address);
    }

    let probVector = normalize(Array.from({length: n}, () => Math.random()));
    return {categoryNames, probVector};
};

/**
 * generate function
 * def func_name(param=None):
 *     ...
 *     return result
 *
 * @param funcName string
 * @param params {key: value}
 * @param body string
 * @param result string, return item name
 * @return {string}
 */
const generateDef = (funcName, params, body, result) => {
    let paramsStr = [];
    for (let key in params) {
        if (params[key]) {
            paramsStr.push(`${key}=${params[key]}`);
        } else {
            paramsStr.push(key);
        }
    }
    return `def ${funcName}(${paramsStr.join(', ')}):\n${TAB_SPACE}${body.replaceAll('\n', `\n${TAB_SPACE}`)}\n${TAB_SPACE}return ${result}`;
};

/**
 * TODO: generate an unique identifier
 *
 * @param name
 * @param alphanumeric
 * @param numberOfDigits
 * @return {`# need an unique identifier ${string}`}
 */
const generateUniqueIdentifier = (name = '', alphanumeric = 'alphanumeric', numberOfDigits = 6) => {
    return `# need an unique identifier ${name}`;
};

/**
 * generate a set of address
 *
 * @param street
 * @param city
 * @param state
 * @param zip
 * @return {string}
 */
const generateAddress = (street = '', city = '', state = '', zip = '') => {
    const funcPrefix = 'ad.update_predictor_address(';
    let code = `${funcPrefix}street_predictor_name="${street}",`;
    code += `\n${' '.repeat(funcPrefix.length)}city_predictor_name="${city}",`;
    code += `\n${' '.repeat(funcPrefix.length)}state_predictor_name="${state}",`;
    code += `\n${' '.repeat(funcPrefix.length)}zip_predictor_name="${zip}")`;
    return code;
};

/**
 * generate a name
 *
 * @param name
 * @param nameType
 * @return {string}
 */
const generateName = (name = '', nameType = 'Person') => {
    return `ad.update_predictor_${nameType.toLowerCase()}_name(predictor_name="${name}")`;
};

/**
 * generate a date
 *
 * @param name
 * @param fromDate
 * @param toDate
 * @return {string}
 */
const generateDate = (name = '', fromDate = [1970, 1, 1], toDate = [1970, 1, 1]) => {
    const funcPrefix = 'ad.update_predictor_date(';
    let code = `${funcPrefix}predictor_name="${name}",`;
    code += `\n${' '.repeat(funcPrefix.length)}from_date=datetime(${fromDate.join(', ')}),`;
    code += `\n${' '.repeat(funcPrefix.length)}to_date=datetime(${toDate.join(', ')}))`;
    return code;
};

/**
 * generate a group of Multivariate Normals
 * update_predictor_normal(predictor_name_list, mean, covariance_matrix)
 *
 * @param multivariateNormalList string[], predictor name list
 * @param covarianceMatrix number[][]
 * @param count number, current count suffix of covariance_matrix
 * @return {string}
 */
const generateMultivariateNormal = (multivariateNormalList = [], covarianceMatrix = [[]], count = 1) => {
    const suffix = count > 1 ? count : '';

    // generate covariance_matrix
    const arrPrefix = `covariance_matrix${suffix} = np.array(`;
    let code = `${arrPrefix}${numberArray2Dim(covarianceMatrix, arrPrefix.length)})`;

    // generate expression for update_predictor_normal
    const funcPrefix = 'ad.update_predictor_normal(';
    code += `\n${funcPrefix}predictor_name_list=${stringArray(multivariateNormalList.map(field => field.name))},`;
    code += `\n${' '.repeat(funcPrefix.length)}mean=${numberArray(multivariateNormalList.map(field => field.mean))},`;
    code += `\n${' '.repeat(funcPrefix.length)}covariance_matrix=covariance_matrix${suffix})`;
    return code;
};

/**
 * generate a categorical predictor
 * update_predictor_categorical(predictor_name, category_names, prob_vector)
 *
 * @param name string
 * @param categoryNames string[]
 * @param probVector number[]
 * @return {string}
 */
const generateCategorical = (name, categoryNames, probVector) => {
    const funcPrefix = 'ad.update_predictor_categorical(';
    // manage long params
    let paramsStr = [`"${name}"`, stringArray(categoryNames), numberArray(probVector)];
    // ____${funcPrefix}${p1}, ${p2}, ${p3})
    if (funcPrefix.length + paramsStr[0].length + paramsStr[1].length + paramsStr[2].length + 9 > MAX_ROW_LEN) {
        return `${funcPrefix}${paramsStr.join(`,\n${' '.repeat(funcPrefix.length)}`)})`;
    } else {
        return `${funcPrefix}${paramsStr.join(', ')})`;
    }
};

/**
 * generate a new predictor, change categorical value into numerical value
 * categorical_mapping = {"Red": 0, "Blue": 1}
 * ad.predictor_matrix["X6_weight"] = ad.predictor_matrix.replace({"X6": categorical_mapping}, inplace=False)["X6"]
 *
 * @param name string, predictor name
 * @param target string, name of the source categorical predictor
 * @param categoricalMapping {categoryName: value}
 * @param inplace boolean
 * @return {string}
 */
const generateCategoricalToNumerical = (name, target, categoricalMapping = {}, inplace = false) => {
    let code = `categorical_mapping_${target} = ${mappingObject(categoricalMapping)}`;
    const funcPrefix = `ad.predictor_matrix["${name}"] = ad.predictor_matrix.replace(`;
    code += `\n${funcPrefix}{"${target}": categorical_mapping_${target}},`;
    code += `\n${' '.repeat(funcPrefix.length)}inplace=${booleanString(inplace)})["${target}"]`;
    // code += `\nprint(ad.predictor_matrix)`;
    return code;
};

/**
 * generate a uniform
 * update_predictor_uniform(predictor_name, lower_bound, upper_bound)
 *
 * @param name string
 * @param lowerBound float
 * @param upperBound float
 * @return {string}
 */
const generateUniform = (name, lowerBound = 0, upperBound = 1.0) => {
    return `ad.update_predictor_uniform("${name}", ${lowerBound}, ${upperBound})`;
};

/**
 * generate a list of predictors as beta distributed
 * update_predictor_beta(predictor_name_list, a, b)
 *
 * @param predictorNames string[], predictor name list
 * @param alphas number[]
 * @param betas number[]
 * @return {string}
 */
const generateBeta = (predictorNames, alphas, betas) => {
    return `ad.update_predictor_beta(${stringArray(predictorNames)}, np.array(${numberArray(alphas)}), np.array(${numberArray(betas)}))`;
};

/**
 * generate a predictor which is multicollinear with other predictors
 * update_predictor_multicollinear(target_predictor_name, dependent_predictors_list, beta, epsilon_variance)
 *
 * @param targetPredictorName string
 * @param dependentPredictorsList string[]
 * @param beta number[]
 * @param epsilonVariance number
 * @return {string}
 */
const generateMulticollinear = (targetPredictorName, dependentPredictorsList, beta, epsilonVariance) => {
    const funcPrefix = 'ad.update_predictor_multicollinear(';
    let code = `${funcPrefix}target_predictor_name="${targetPredictorName}",`;
    code += `\n${' '.repeat(funcPrefix.length)}dependent_predictors_list=${stringArray(dependentPredictorsList)},`;
    code += `\n${' '.repeat(funcPrefix.length)}beta=${numberArray(beta)},`;
    code += `\n${' '.repeat(funcPrefix.length)}epsilon_variance=${epsilonVariance})`;
    return code;
};

/**
 * generate a categorical factor into response in a polynomial manner
 * update_response_poly_categorical(predictor_name, betas)
 *
 * @param name string
 * @param betas {key: value}, key is name of categorical predictor, and value is corresponding beta value
 * @return {string}
 */
const generatePolynomialCategorical = (name, betas) => {
    const funcPrefix = 'ad.update_response_poly_categorical(';
    let code = `${funcPrefix}predictor_name="${name}",`;
    code += `\n${' '.repeat(funcPrefix.length)}betas=${mappingObject(betas)})`;
    return code;
};

/**
 * generate response vector based on a linear regression generative model
 * generate_response_vector_linear(predictor_name_list, beta, epsilon_variance)
 *
 * @param predictorsMap {key: value}, key is predictor name, and value is an object only contains property beta
 * @param intercept number
 * @param epsilonVariance number
 * @param exponent string, number or empty string
 * @return {string}
 */
const generateResponseVectorLinear = (predictorsMap, intercept, epsilonVariance, exponent) => {
    const funcPrefix = 'ad.generate_response_vector_linear(';
    let predictorList = [], beta = [intercept];
    for (let key in predictorsMap) {
        predictorList.push(key);
        beta.push(predictorsMap[key].beta || 0);
    }

    let code = `predictor_name_list = ${stringArray(predictorList)}`;
    code += `\nbeta = ${numberArray(beta)}`
    code += `\neps_var = ${epsilonVariance}`;

    code += `\n${funcPrefix}predictor_name_list=predictor_name_list,`;
    code += `\n${' '.repeat(funcPrefix.length)}beta=beta,`;
    code += `\n${' '.repeat(funcPrefix.length)}epsilon_variance=eps_var)`;

    if (exponent) {
        code += `\nad.response_vector = np.exp(${exponent} * ad.response_vector)`;
    }
    return code;
};

/**
 * generate polynomial response vector based on a linear regression generative model that contains polynomial terms for
 * one or more of the predictors and interaction terms
 * generate_response_vector_polynomial(predictor_name_list, polynomial_order, beta, interaction_term_betas, epsilon_variance)
 *
 * @param predictorsMap {key: value}, key is predictor name, and value is an object contains property beta and polynomialOrder
 * @param intercept number
 * @param interactionTermBetas number[][]
 * @param epsilonVariance number
 * @param exponent string, number or empty string
 * @return {string}
 */
const generateResponseVectorPolynomial = (predictorsMap, intercept, interactionTermBetas, epsilonVariance, exponent) => {
    const funcPrefix = 'ad.generate_response_vector_polynomial(';
    let predictorList = [], beta = [intercept], polynomialOrder = [];
    for (let key in predictorsMap) {
        predictorList.push(key);
        beta.push(predictorsMap[key].beta || 0);
        polynomialOrder.push(predictorsMap[key].polynomialOrder || 1);
    }

    let code = `predictor_name_list = ${stringArray(predictorList)}`;
    code += `\npolynomial_order = ${numberArray(polynomialOrder)}`;
    code += `\nbeta = ${numberArray(beta)}`;
    const expPrefix = 'int_matrix = np.array(';
    code += `\n${expPrefix}${numberArray2Dim(interactionTermBetas, expPrefix.length)})`;
    code += `\neps_var = ${epsilonVariance}`;

    code += `\n${funcPrefix}predictor_name_list=predictor_name_list,`;
    code += `\n${' '.repeat(funcPrefix.length)}polynomial_order=polynomial_order,`;
    code += `\n${' '.repeat(funcPrefix.length)}beta=beta,`;
    code += `\n${' '.repeat(funcPrefix.length)}interaction_term_betas=int_matrix,`;
    code += `\n${' '.repeat(funcPrefix.length)}epsilon_variance=eps_var)`;

    if (exponent) {
        code += `\nad.response_vector = np.exp(${exponent} * ad.response_vector)`;
    }
    return code;
};

/**
 * generate code string and import code string
 *
 * @param numberOfRows number
 * @param fieldList any[]
 * @param covarianceMatrix {key: number[][]}, key is group id, and value is covariance matrix
 * @return {{code: string, importCode: string}}
 */
export default function generate(numberOfRows = 1000, fieldList = [], covarianceMatrix = {}) {
    // get response vector
    const responseVector = fieldList.filter(field => field.type.startsWith(RESPONSE_VECTOR_TYPE_PRE))[0] || null;

    // init dataframe and import code
    let fieldNameList = [];
    for (let field of fieldList) {
        if (field.type.startsWith(RESPONSE_VECTOR_TYPE_PRE)) continue;
        if (field.type === FIELD_TYPE_LIST.ADDRESS) {
            fieldNameList.push(field.street);
            fieldNameList.push(field.city);
            fieldNameList.push(field.state);
            fieldNameList.push(field.zip);
        } else {
            fieldNameList.push(field.name);
        }
    }
    let code = `ad = AnalyticsDataframe(${numberOfRows}, ${fieldNameList.length}, ${stringArray(fieldNameList)}, "${responseVector.name}", seed=seed)\n`;
    let importCode = [IMPORT_ANALYTICS_DF];

    // unique identifier
    const uniqueIdentifierList = fieldList.filter(field => field.type === FIELD_TYPE_LIST.UNIQUE_IDENTIFIER);
    for (let uniqueIdentifier of uniqueIdentifierList) {
        code += `\n${generateUniqueIdentifier(uniqueIdentifier.name, uniqueIdentifier.alphanumeric, uniqueIdentifier.numberOfDigits)}`;
    }

    // name
    const nameList = fieldList.filter(field => field.type === FIELD_TYPE_LIST.NAME);
    for (let name of nameList) {
        code += `\n${generateName(name.name, name.nameType)}`;
    }

    // address
    const addressList = fieldList.filter(field => field.type === FIELD_TYPE_LIST.ADDRESS);
    for (let address of addressList) {
        code += `\n${generateAddress(address.street, address.city, address.state, address.zip)}`;
    }

    // date
    const dateList = fieldList.filter(field => field.type === FIELD_TYPE_LIST.DATE);
    if (dateList.length > 0) {
        importCode.push(IMPORT_DATETIME);
    }
    for (let date of dateList) {
        code += `\n${generateDate(date.name, date.fromDate, date.toDate)}`;
    }

    // multivariate normal
    const multivariateNormalList = fieldList.filter(field => field.type === FIELD_TYPE_LIST.MULTIVARIATE_NORMAL);
    let multivariateNormalMapping = {};
    for (let multivariateNormal of multivariateNormalList) {
        if (!Object.keys(multivariateNormalMapping).includes(`GROUP_${multivariateNormal.groupNum}`)) {
            multivariateNormalMapping[`GROUP_${multivariateNormal.groupNum}`] = {
                fieldList: [],
                covarianceMatrix: covarianceMatrix[`GROUP_${multivariateNormal.groupNum}`],
            };
        }
        multivariateNormalMapping[`GROUP_${multivariateNormal.groupNum}`].fieldList.push(multivariateNormal);
    }
    let multivariateNormalCount = 0;
    for (let multivariateNormalGroupKey of Object.keys(multivariateNormalMapping)) {
        multivariateNormalCount += 1;
        let fieldList = multivariateNormalMapping[multivariateNormalGroupKey].fieldList.sort((currentVal, nextVal) => currentVal.index - nextVal.index);
        code += `\n${generateMultivariateNormal(fieldList, multivariateNormalMapping[multivariateNormalGroupKey].covarianceMatrix, multivariateNormalCount)}`;
    }
    if (multivariateNormalCount > 0) {
        importCode.push(IMPORT_NUMPY);
    }

    // uniform
    const uniformList = fieldList.filter(field => field.type === FIELD_TYPE_LIST.UNIFORM);
    for (let uniform of uniformList) {
        code += `\n${generateUniform(uniform.name, uniform.lowerBound, uniform.upperBound)}`;
    }

    // beta
    const betaList = fieldList.filter(field => field.type === FIELD_TYPE_LIST.BETA);
    let names = [], alphas = [], betas = [];
    for (let beta of betaList) {
        names.push(beta.name);
        alphas.push(beta.alpha);
        betas.push(beta.beta);
    }
    if (betaList.length > 0) {
        importCode.push(IMPORT_NUMPY);
        code += `\n${generateBeta(names, alphas, betas)}`;
    }

    // multicollinear
    const multicollinearList = fieldList.filter(field => field.type === FIELD_TYPE_LIST.MULTICOLLINEAR);
    for (let multicollinear of multicollinearList) {
        let dependentList = [], beta = [multicollinear.intercept];
        for (let key of Object.keys(multicollinear.predictorList)) {
            dependentList.push(key);
            beta.push(multicollinear.predictorList[key]);
        }
        code += `\n${generateMulticollinear(multicollinear.name, dependentList, beta, multicollinear.epsilonVariance)}`;
    }

    // polynomial categorical
    const polynomialCategoricalList = fieldList.filter(field => field.type === FIELD_TYPE_LIST.POLYNOMIAL_CATEGORICAL);
    for (let polynomialCategorical of polynomialCategoricalList) {
        code += `\n${generatePolynomialCategorical(polynomialCategorical.name, polynomialCategorical.betas)}`;
    }

    // categorical value to numerical value
    const categorical2NumericalList = fieldList.filter(field => field.type === FIELD_TYPE_LIST.CATEGORICAL_TO_NUMERICAL);
    for (let field of categorical2NumericalList) {
        code += '\n';
        code += `\n# create a new predictor column, change categorical value into numerical value`;
        code += `\n${generateCategoricalToNumerical(field.name, field.target, field.categoricalMapping, field.inplace)}`;
    }

    // response vector
    if (responseVector.type === FIELD_TYPE_LIST.RESPONSE_VECTOR_LINEAR) {
        code += `\n\n${generateResponseVectorLinear(responseVector.predictorList, responseVector.intercept, responseVector.epsilonVariance, responseVector.exponent)}`;
        if (responseVector.exponent) {
            importCode.push(IMPORT_NUMPY);
        }
    } else {
        importCode.push(IMPORT_NUMPY);
        code += `\n\n${generateResponseVectorPolynomial(responseVector.predictorList, responseVector.intercept, responseVector.interactionTermBetas, responseVector.epsilonVariance, responseVector.exponent)}`;
    }

    code = generateDef('generate_ad', {seed: 'None'}, code, 'ad');
    return {code, importCode: Array.from(new Set(importCode)).join('\n')};
};

/* Sample Python Code #1
ad = AnalyticsDataframe(1000, 6)
covariance_matrix = np.array([[10, 9, 4],
                              [9, 10, 6],
                              [4, 6, 20]])
ad.update_predictor_normal(predictor_name_list=["X1", "X2", "X3"],
                           mean=[100, 88, 120],
                           covariance_matrix=covariance_matrix)
ad.update_predictor_uniform("X5", 0, 100)
ad.update_predictor_categorical("X6", ["Red", "Yellow", "Blue"], [0.3, 0.4, 0.3])

ad.update_predictor_multicollinear(target_predictor_name="X4",
                                   dependent_predictors_list=["X1", "X2", "X3"],
                                   beta=[0, 1, 1.5, 0],
                                   epsilon_variance=20)

# create a new predictor column, change categorical value into numerical value
categorical_mapping = {"Red": 5, "Yellow": 1, "Blue": 1}
ad.predictor_matrix["X6_weight"] = ad.predictor_matrix.replace({"X6": categorical_mapping}, inplace=False)["X6"]
print(ad.predictor_matrix)

predictor_name_list = ["X1", "X3", "X6_weight"]
polynomial_order = [1, 1, 1]
beta = [100, 0, 1.5, 0]
int_matrix = np.array([[0, 0, 0],
                       [0, 0, 0],
                       [1, 0, 0]])
eps_var = 10

ad.generate_response_vector_polynomial(
    predictor_name_list=predictor_name_list,
    polynomial_order=polynomial_order,
    beta=beta,
    interaction_term_betas=int_matrix,
    epsilon_variance=eps_var)
ad.response_vector = np.exp(0.001 * ad.response_vector)
*/

/* Sample Python Code #2
def generate_ad(seed=None):
    ad = adf.AnalyticsDataframe(20, 5, ["xx1", "xx2", "xx3", "xx4", "xx5"], "yy", seed=seed)
    covariance_matrix = np.array([[1, 0.1817, 0.2048, 0.1419, 0.0582],
                                  [0.1817, 1, 0.9739, 0.1595, 0.1539],
                                  [0.2048, 0.9739, 1, 0.1931, 0.1910],
                                  [0.1419, 0.1595, 0.1931, 1, 0.7048],
                                  [0.0582, 0.1539, 0.1910, 0.7048, 1]])
    ad.update_predictor_normal(predictor_name_list=["xx1", "xx2", "xx3", "xx4", "xx5"],
                               mean=[23.5, 2, -5.5, -10, 50],
                               covariance_matrix=covariance_matrix)
    return ad
*/
