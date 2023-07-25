const MAX_ROW_LEN = 113;  // for md
const TAB_SPACE = '    ';
const IMPORT_ANALYTICS_DF = 'from analyticsdf.analyticsdataframe import AnalyticsDataframe';
const IMPORT_NUMPY = 'import numpy as np';
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

export const CATEGORY_TYPE_LIST = ['NAME', 'ADDRESS_ADDRESS', 'ADDRESS_CITY', 'ADDRESS_STATE', 'CATEGORICAL'];
export const NUMERIC_TYPE_LIST = ['UNIFORM', 'MULTIVARIATE_NORMAL', 'CATEGORICAL_TO_NUMERICAL', 'MULTICOLLINEAR', 'BETA'];

const booleanString = (bool = false) => {
    const str = String(bool);
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const numberArray = (arr = []) => {
    let res = '[';
    for (let item of arr) {
        res += `${Number(item) || 0}, `;
    }
    if (arr.length > 0) {
        res = res.substring(0, res.length - 2);
    }
    res += ']';
    return res;
};

const numberArray2Dim = (arr = [], prefixLen = 0) => {
    const space = prefixLen + 1;  // plus 1 for the first [
    let res = '[';
    for (let arrItem of arr) {
        res += `${numberArray(arrItem)},\n${' '.repeat(space)}`;
    }
    if (arr.length > 0) {
        res = res.substring(0, res.length - 2 - space);
    }
    res += ']';
    return res;
};

const stringArray = (arr = []) => {
    let res = '[';
    for (let item of arr) {
        res += `"${item || ""}", `;
    }
    if (arr.length > 0) {
        res = res.substring(0, res.length - 2);
    }
    res += ']';
    return res;
};

const mappingObject = (mapping = {}) => {
    let res = '{';
    for (let key of Object.keys(mapping)) {
        res += `"${key || ""}": ${mapping[key]}, `;
    }
    if (Object.keys(mapping).length > 0) {
        res = res.substring(0, res.length - 2);
    }
    res += '}';
    return res;
};

const generateProbVector = (probVector = [1]) => {
    const sum = probVector.reduce((acc, val) => acc + val, 0);
    probVector = probVector.map(val => parseFloat((val / sum).toFixed(2)));

    const sumWithoutEnd = probVector.reduce((acc, val, idx) => (idx < probVector.length - 1) ? (acc + val) : acc, 0);
    probVector[probVector.length - 1] = parseFloat(1 - sumWithoutEnd).toFixed(2);

    return probVector;
}

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

    let probVector = generateProbVector(Array.from({length: n}, () => Math.random()));
    return {categoryNames, probVector};
};

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

    let probVector = generateProbVector(Array.from({length: n}, () => Math.random()));
    return {categoryNames, probVector};
};

// generate function: def func_name(param=None): ...
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

const generateMultivariateNormal = (multivariateNormalList, covarianceMatrix, count) => {
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

const generateCategorical = (fieldName, categoryNames, probVector) => {
    const funcPrefix = 'ad.update_predictor_categorical(';
    // manage long params
    let paramsStr = [`"${fieldName}"`, stringArray(categoryNames), numberArray(probVector)];
    // ____${funcPrefix}${p1}, ${p2}, ${p3})
    if (funcPrefix.length + paramsStr[0].length + paramsStr[1].length + paramsStr[2].length + 9 > MAX_ROW_LEN) {
        return `${funcPrefix}${paramsStr.join(`,\n${' '.repeat(funcPrefix.length)}`)})`;
    } else {
        return `${funcPrefix}${paramsStr.join(', ')})`;
    }
};

const generateCategoricalToNumerical = (name, target, categoricalMapping = {}, inplace = false) => {
    let code = `categorical_mapping = ${mappingObject(categoricalMapping)}`;
    const funcPrefix = `ad.predictor_matrix["${name}"] = ad.predictor_matrix.replace(`;
    code += `\n${funcPrefix}{"${target}": categorical_mapping},`;
    code += `\n${' '.repeat(funcPrefix.length)}inplace=${booleanString(inplace)})["${target}"]`;
    // code += `\nprint(ad.predictor_matrix)`;
    return code;
};

const generateUniform = (predictorName, lowerBound = 0, upperBound = 1.0) => {
    return `ad.update_predictor_uniform("${predictorName}", ${lowerBound}, ${upperBound})`;
};

const generateBeta = (names, alphas, betas) => {
    return `ad.update_predictor_beta(${stringArray(names)}, np.array(${numberArray(alphas)}), np.array(${numberArray(betas)}))`;
};

const generateMulticollinear = (targetPredictorName, dependentPredictorsList, beta, epsilonVariance) => {
    const funcPrefix = 'ad.update_predictor_multicollinear(';
    let code = `${funcPrefix}target_predictor_name="${targetPredictorName}",`;
    code += `\n${' '.repeat(funcPrefix.length)}dependent_predictors_list=${stringArray(dependentPredictorsList)},`;
    code += `\n${' '.repeat(funcPrefix.length)}beta=${numberArray(beta)},`;
    code += `\n${' '.repeat(funcPrefix.length)}epsilon_variance=${epsilonVariance})`;
    return code;
};

const generatePolynomialCategorical = (predictorName, betas) => {
    const funcPrefix = 'ad.update_response_poly_categorical(';
    let code = `${funcPrefix}predictor_name="${predictorName}",`;
    code += `\n${' '.repeat(funcPrefix.length)}betas=${mappingObject(betas)})`;
    return code;
};

const generateResponseVectorLinear = (responseVector) => {
    const funcPrefix = 'ad.generate_response_vector_linear(';
    let predictorList = [], beta = [responseVector.intercept];
    for (let key in responseVector.predictorList) {
        predictorList.push(key);
        beta.push(responseVector.predictorList[key].beta);
    }

    let code = `predictor_name_list = ${stringArray(predictorList)}`;
    code += `\nbeta = ${numberArray(beta)}`
    code += `\neps_var = ${responseVector.epsilonVariance}`;

    code += `\n${funcPrefix}predictor_name_list=predictor_name_list,`;
    code += `\n${' '.repeat(funcPrefix.length)}beta=beta,`;
    code += `\n${' '.repeat(funcPrefix.length)}epsilon_variance=eps_var)`;
    return code;
};

const generateResponseVectorPolynomial = (responseVector) => {
    const funcPrefix = 'ad.generate_response_vector_polynomial(';
    let predictorList = [], beta = [responseVector.intercept], polynomialOrder = [];
    for (let key in responseVector.predictorList) {
        predictorList.push(key);
        beta.push(responseVector.predictorList[key].beta);
        polynomialOrder.push(responseVector.predictorList[key].polynomialOrder || 1);
    }

    let code = `predictor_name_list = ${stringArray(predictorList)}`;
    code += `\npolynomial_order = ${numberArray(polynomialOrder)}`;
    code += `\nbeta = ${numberArray(beta)}`;
    const expPrefix = 'int_matrix = np.array(';
    code += `\n${expPrefix}${numberArray2Dim(responseVector.interactionTermBetas, expPrefix.length)})`;
    code += `\neps_var = ${responseVector.epsilonVariance}`;

    code += `\n${funcPrefix}predictor_name_list=predictor_name_list,`;
    code += `\n${' '.repeat(funcPrefix.length)}polynomial_order=polynomial_order,`;
    code += `\n${' '.repeat(funcPrefix.length)}beta=beta,`;
    code += `\n${' '.repeat(funcPrefix.length)}interaction_term_betas=int_matrix,`;
    code += `\n${' '.repeat(funcPrefix.length)}epsilon_variance=eps_var)`;
    return code;
};

export default function generate(numberOfRows = 1000, fieldList = [], covarianceMatrix = []) {
    // get response vector
    const responseVector = fieldList.filter(field => field.type.startsWith('RESPONSE_VECTOR_'))[0] || null;

    // init dataframe and import code
    let code = `ad = AnalyticsDataframe(${numberOfRows}, ${fieldList.length - 1}, ${stringArray(fieldList.filter(field => !field.type.startsWith('RESPONSE_VECTOR_')).map(field => field.name))}, "${responseVector.name}", seed=seed)`;
    let importCode = [IMPORT_ANALYTICS_DF];

    // multivariate normal
    const multivariateNormalList = fieldList.filter(field => field.type === 'MULTIVARIATE_NORMAL');
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
    const uniformList = fieldList.filter(field => field.type === 'UNIFORM');
    for (let uniform of uniformList) {
        code += `\n${generateUniform(uniform.name, uniform.lowerBound, uniform.upperBound)}`;
    }

    // beta
    const betaList = fieldList.filter(field => field.type === 'BETA');
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

    // category: name & address (address+city+state)
    const categoryList = fieldList.filter(field => CATEGORY_TYPE_LIST.includes(field.type));
    let addressList = {};
    for (let category of categoryList) {
        if (category.type === 'NAME') {
            const {categoryNames, probVector} = randomName();
            code += `\n${generateCategorical(category.name, categoryNames, probVector)}`;
        } else if (category.type.startsWith('ADDRESS_')) {
            if (!addressList.hasOwnProperty(`GROUP_${category.groupNum}`)) {
                addressList[`GROUP_${category.groupNum}`] = randomAddress();
            }
            const type = category.type.split('_')[1].toLowerCase();
            code += `\n${generateCategorical(category.name, addressList[`GROUP_${category.groupNum}`].categoryNames.map(item => item[type]), addressList[`GROUP_${category.groupNum}`].probVector)}`;
        } else {
            let categoryNames = [], probVector = [];
            for (let item of category.categoryList) {
                categoryNames.push(item.name);
                probVector.push(Number(item.prob));
            }
            code += `\n${generateCategorical(category.name, categoryNames, generateProbVector(probVector))}`;
        }
    }

    // multicollinear
    const multicollinearList = fieldList.filter(field => field.type === 'MULTICOLLINEAR');
    for (let multicollinear of multicollinearList) {
        let dependentList = [], beta = [multicollinear.intercept];
        for (let key of Object.keys(multicollinear.predictorList)) {
            dependentList.push(key);
            beta.push(multicollinear.predictorList[key]);
        }
        code += `\n${generateMulticollinear(multicollinear.name, dependentList, beta, multicollinear.epsilonVariance)}`;
    }

    // polynomial categorical
    const polynomialCategoricalList = fieldList.filter(field => field.type === 'POLYNOMIAL_CATEGORICAL');
    for (let polynomialCategorical of polynomialCategoricalList) {
        code += `\n${generatePolynomialCategorical(polynomialCategorical.name, polynomialCategorical.betas)}`;
    }

    // categorical value to numerical value
    const categorical2NumericalList = fieldList.filter(field => field.type === 'CATEGORICAL_TO_NUMERICAL');
    for (let field of categorical2NumericalList) {
        code += '\n';
        code += `\n# create a new predictor column, change categorical value into numerical value`;
        code += `\n${generateCategoricalToNumerical(field.name, field.target, field.categoricalMapping, field.inplace)}`;
    }

    // response vector
    if (responseVector.type === 'RESPONSE_VECTOR_LINEAR') {
        code += `\n\n${generateResponseVectorLinear(responseVector)}`;
    } else {
        importCode.push(IMPORT_NUMPY);
        code += `\n\n${generateResponseVectorPolynomial(responseVector)}`;
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
