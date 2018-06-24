var { Builder, selenium, By, until } = require('selenium-webdriver');
var xpath1, where, brandNameXPATH, brandName, categoryXPATH, categoryName, url, routeXPATH, routeName, no_products=0,tagName;
var scroll = true, pnf = true, itemsAddedToCart=0, shipping=null;

var check = {
    homepage:'Not Loading',
    no_products_found:'Products Found Everywhere',
    all_landing_pages:'Not Working',
    login:'Not Working',
    add_to_cart:'Not Working',
    discount_visible:'Discount not visible',
    tax_visible:'Tax not visible',
    shipping_visible:'Not Visible',
    hdfc_page:'Not Loading',
    
};
var no_products_url=[];

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    var tag=[],category=[],product=[];
    for(var i=0;i<5;i++){
        tag.push(Math.floor(Math.random() * (3 - 1 + 1) + 1));
        category.push(Math.floor(Math.random() * (4 - 1 + 1) + 1));
        product.push(Math.floor(Math.random() * (2 - 1 + 1) + 1));
    }
    async function productDetails(i){
        try{
            await clickOn('//*[@id="topheader"]/div[1]/header/nav/div/div[2]/div[1]/ul/li['+tag[i]+']/a','routes');//clicking on the route
            await clickOn('//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li['+category[i]+']/a','category');//clicking on a random category
            notFound = null;
            scroll = pnf = false;
            notFound = await productsNotFound();
            scroll = pnf = true;
            if(notFound=='found'){
                //code to go ahead with prduct details
                try{
                    var element = await driver.findElement(By.xpath('//*[@id="product-grid-list"]'));
                    await element.click().then();//clicked on a random product
                    await driver.executeScript("window.scrollTo(0,0)");//scroll to the top most position
                    var size = await driver.wait(
                        until.elementLocated(By.xpath('//*[@id="topheader"]/div[2]/main/span/div/div/div/div/div/div[2]/div[2]/div[4]/div[3]/div/button/span')),
                        10000
                    );
                    if(!size)
                        size = await driver.findElement(By.xpath('//*[@id="topheader"]/div[2]/main/span/div/div/div/div/div/div[2]/div[2]/div[4]/div[3]/div[1]/button/span'));//find first variant if there are more than one variants
                    await size.click();//click on a variant
                    
                    var quantity = await driver.findElement(By.xpath('//*[@id="add-to-cart-quantity"]'));
                    await quantity.sendKeys('1');// selected quantity as 1

                    var element = await driver.findElement(By.xpath('//*[@id="topheader"]/div[2]/main/span/div/div/div/div/div/div[2]/div[2]/div[7]/button'));
                    await element.click().then();//clicking on add to cart
                    itemsAddedToCart++;
                    check.add_to_cart='Working';
                    //await console.log('========================================= item added to cart =========================================');
                } catch{}
                if(check.add_to_cart!='Working'){
                    await clickOn('//*[@id="topheader"]/div[1]/header/nav/div/div[2]/div[1]/ul/li[1]/a','routes');//clicking on men
                    await clickOn('//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[1]/a','category');//clicking on top wear
                    await clickOn('//*[@id="4tqTTk4tbr5ES4kxf"]/div/div[2]/a/div/div[1]','category');//clicking on the first product
                    //console.log('dksfhwelfmwdcniweidjpsmawlfhoihepjwdmsdgegh;l,sdfpoiqwd;,sdfbdfvhwefkwe');
                    var size = await driver.wait(
                        until.elementLocated(By.xpath('//*[@id="topheader"]/div[2]/main/span/div/div/div/div/div/div[2]/div[2]/div[4]/div[3]/div[1]/button/span')),
                        10000
                    );
                    await size.click();//slected size as M
                    var quantity = await driver.findElement(By.xpath('//*[@id="add-to-cart-quantity"]'));
                    await quantity.sendKeys('1');// selected quantity as 1
                    var element = await driver.findElement(By.xpath('//*[@id="topheader"]/div[2]/main/span/div/div/div/div/div/div[2]/div[2]/div[7]/button/span'));
                    await element.click().then();//clicking on add to cart
                    itemsAddedToCart++;
                    check.add_to_cart='Working';
                    //await console.log('========================================= item added to cart =========================================');
                }
            }
        } finally{
            return;
        }
    };
    async function clickOn(xpath1,where){
        try{
            var button = await driver.wait(
                until.elementLocated(By.xpath(xpath1)),
                20000
            );
            //await productsNotFound();
            if(scroll);
                await driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
            await driver.sleep(100);
            await button.click(); 
        } finally{
            //console.log('checking in->'+where);
            return;
        }
    };
    async function productsNotFound(){
        try{
            url = await driver.getCurrentUrl();
            //await driver.sleep(1250);
            var notFound = await driver.findElement(By.xpath('//*[@id="topheader"]/div[2]/main/span/div/div/div/span'))
            .then();
            if(scroll)
                await driver.executeScript("window.scrollTo(0,100)");
            //await driver.sleep(2500);
        } finally{
            if(notFound){
                no_products++;
                check.no_products_found='No Products Found present';
            }
            if(notFound && pnf){
                no_products_url.push(url);
                no_products_url.push('\n');
                //console.log('----------------------------------------------------------------------------\nNo product found in url->'+url+'\n----------------------------------------------------------------------------');
                return 'not found';
            }
            else 
                return 'found';
        }
    };
    async function men(categoryXPATH,categoryName){
        try{
            url = await driver.getCurrentUrl();
            await clickOn('//*[@id="topheader"]/div[1]/header/nav/div/div[2]/div[1]/ul/li[1]/a','men in nav bar');//clicking on men in nav bar
            await clickOn(categoryXPATH,categoryName);//which category in men->eg. top wear
            await productsNotFound();
            var button = await driver.wait(
                until.elementLocated(By.xpath(xpath1)),
                20000
            );
            await button.click();
        } finally{
            return;
        }
    };
    async function women(categoryXPATH,categoryName){
        try{
            url = await driver.getCurrentUrl();
            await clickOn('//*[@id="topheader"]/div[1]/header/nav/div/div[2]/div[1]/ul/li[2]/a','women in nav bar');//clicking on men in nav bar
            await clickOn(categoryXPATH,categoryName);//which category in women->eg. top wear
            await productsNotFound();
            var button = await driver.wait(
                until.elementLocated(By.xpath(xpath1)),
                20000
            );
            await button.click();
        } finally{
            return;
        }
    };
    async function shoesAndAccessories(categoryXPATH,categoryName){
        try{
            url = await driver.getCurrentUrl();
            await clickOn('//*[@id="topheader"]/div[1]/header/nav/div/div[2]/div[1]/ul/li[3]/a','shoes and accessories in nav bar');//clicking on men in nav bar
            await clickOn(categoryXPATH,categoryName);//which category in shoes->eg. men's footwear
            await productsNotFound();
            var button = await driver.wait(
                until.elementLocated(By.xpath(xpath1)),
                20000
            );
            await button.click();
        } finally{
            return;
        }
    };
    async function brands(brandNameXPATH,brandName,categoryXPATH,categoryName){
        try{
            url = await driver.getCurrentUrl();
            await clickOn('//*[@id="topheader"]/div[1]/header/nav/div/div[2]/div[1]/ul/li[4]/a','brands');//brands nav bar
            await clickOn(brandNameXPATH,brandName);//which brand to click
            await clickOn(categoryXPATH,categoryName);//which category in this brand
            await productsNotFound();
            var button = await driver.wait(
                until.elementLocated(By.xpath(xpath1)),
                20000
            );
            await button.click();
        } finally{
            return;
        }
    };
    
    try {
        console.log('**************************************************Test Started**************************************************');
        await driver.get('http://beta.asort.com');//homepage
        check.homepage='Loading correctly';
        //await console.log('\t\t\t\t\t\t\t+-----------------------+\n\t\t\t\t\t\t\t|\thomepage\t|\n\t\t\t\t\t\t\t+-----------------------+');
        // ------------------------------------------ MEN ------------------------------------------
        //console.log('\n\n**********testing for men**********\n');
        await men('//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[1]/a','men top wear');
        await men('//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[2]/a','men bottom wear');
        await men('//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[3]/a','men active wear');
        await men('//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[4]/a','men ethnic wear');
        await men('//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[5]/a','men accessories wear');
        // ------------------------------------------ WOMEN ------------------------------------------
        //console.log('\n\n**********testing for women**********\n');
        await women('//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[1]/a','women top wear');
        await women('//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[2]/a','women bottom wear');
        await women('//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[3]/a','women active wear');
        await women('//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[4]/a','women ethnic wear');
        await women('//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[5]/a','women accessories wear');
        // ------------------------------------------ SHOE AND ACCESSORIES ------------------------------------------
        //console.log('\n\n**********testing for shoes and accessories**********\n');
        await shoesAndAccessories('//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[1]/a','men\'s shoes');
        await shoesAndAccessories('//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[2]/a','men\'s accessories');
        await shoesAndAccessories('//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[3]/a','women\'s shoes');
        await shoesAndAccessories('//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[4]/a','women\'s accessories');
        // ------------------------------------------ BRANDS ------------------------------------------
        //await console.log('\n\n**********Brands**********\n\n');
        // ------------------------------------------ Mr. Huffman ------------------------------------------
        //await console.log('\n\**********Mr.Huffman**********\n');
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[2]/a',
            'brands->Mr. Huffman',
            '//*[@id="specific-huffman"]/div[3]/div[1]/span/div/span',
            'brands->Mr. Huffman->printed shirts'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[2]/a',
            'brands->Mr. Huffman',
            '//*[@id="specific-huffman"]/div[3]/div[2]/span/div/span',
            'brands->Mr. Huffman->bags'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[2]/a',
            'brands->Mr. Huffman',
            '//*[@id="specific-huffman"]/div[4]/div[1]/span/h4',
            'brands->Mr. Huffman->blazzers'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[2]/a',
            'brands->Mr. Huffman',
            '//*[@id="specific-huffman"]/div[4]/div[2]/span/h4',
            'brands->Mr. Huffman->bottoms'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[2]/a',
            'brands->Mr. Huffman',
            '//*[@id="specific-huffman"]/div[4]/div[3]/span/h4',
            'brands->Mr. Huffman->shoes'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[2]/a',
            'brands->Mr. Huffman',
            '//*[@id="specific-huffman"]/div[4]/div[4]/span/h4',
            'brands->Mr. Huffman->formal shirts'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[2]/a',
            'brands->Mr. Huffman',
            '//*[@id="specific-huffman"]/div[4]/div[5]/span/h4',
            'brands->Mr. Huffman->ties'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[2]/a',
            'brands->Mr. Huffman',
            '//*[@id="specific-huffman"]/div[4]/div[6]/span/h4',
            'brands->Mr. Huffman->sunglasses'
        );
        // ------------------------------------------ ABG ------------------------------------------
        //await console.log('\n\**********ABG**********\n');
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[1]/a',
            'brands->ABG',
            '//*[@id="specific-abg"]/div[3]/div[1]/span/div/span',
            'brands->ABG->women'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[1]/a',
            'brands-ABG',
            '//*[@id="specific-abg"]/div[3]/div[2]/span/div/span',
            'brands->ABG->men'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[1]/a',
            'brands->ABG',
            '//*[@id="specific-abg"]/div[4]/div[1]/span/h4',
            'brands->ABG->shirts'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[1]/a',
            'brands->ABG',
            '//*[@id="specific-abg"]/div[4]/div[2]/span/h4',
            'brands->ABG->bottoms'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[1]/a',
            'brands->ABG',
            '//*[@id="specific-abg"]/div[4]/div[3]/span/h4',
            'brands->ABG->graphic tees'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[1]/a',
            'brands->ABG',
            '//*[@id="specific-abg"]/div[4]/div[4]/span/h4',
            'brands->ABG->bags'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[1]/a',
            'brands->ABG',
            '//*[@id="specific-abg"]/div[4]/div[5]/span/h4',
            'brands->ABG->shoes'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[1]/a',
            'brands->ABG',
            '//*[@id="specific-abg"]/div[4]/div[6]/span/h4',
            'brands->ABG->snapbacks'
        );
        // ------------------------------------------ Kuefit ------------------------------------------
        //await console.log('\n\**********Kuefit**********\n');
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[3]/a',
            'brands->Kuefit',
            '//*[@id="specific-kuefit"]/div[3]/div[1]/span/div/span',
            'brands->Kyufit->men'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[3]/a',
            'brands-Kuefit',
            '//*[@id="specific-kuefit"]/div[3]/div[2]/span/div/span',
            'brands->Kuefit->women'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[3]/a',
            'brands->Kuefit',
            '//*[@id="specific-kuefit"]/div[4]/div[1]/span/h4',
            'brands->Kuefit->mes\'s shorts'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[3]/a',
            'brands->Kuefit',
            '//*[@id="specific-kuefit"]/div[4]/div[2]/span/h4',
            'brands->Kuefit->men\'s polo'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[3]/a',
            'brands->Kuefit',
            '//*[@id="specific-kuefit"]/div[4]/div[3]/span/h4',
            'brands->Kuefit->yoga pants'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[3]/a',
            'brands->Kuefit',
            '//*[@id="specific-kuefit"]/div[4]/div[4]/span/h4',
            'brands->Kuefit->bags'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[3]/a',
            'brands->Kuefit',
            '//*[@id="specific-kuefit"]/div[4]/div[5]/span/h4',
            'brands->Kuefit->sports bra'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[3]/a',
            'brands->Kuefit',
            '//*[@id="specific-kuefit"]/div[4]/div[6]/span/h4',
            'brands->Kuefit->sport shoes'
        );
        // ------------------------------------------ Ifazone ------------------------------------------
        //await console.log('\n**********Ifazone**********\n');
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[4]/a',
            'brands->Ifazone',
            '//*[@id="specific-ifazone"]/div[3]/div[1]/span/div/span',
            'brands->Ifazone->women'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[4]/a',
            'brands->Ifazone',
            '//*[@id="specific-ifazone"]/div[3]/div[2]/span/div/span',
            'brands->Ifazone->men'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[4]/a',
            'brands->Ifazone',
            '//*[@id="specific-ifazone"]/div[4]/div[1]/span/h4',
            'brands->Ifazone->formal trousers'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[4]/a',
            'brands->Ifazone',
            '//*[@id="specific-ifazone"]/div[4]/div[2]/span/h4',
            'brands->Ifazone->basic shirts'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[4]/a',
            'brands->Ifazone',
            '//*[@id="specific-ifazone"]/div[4]/div[3]/span/h4',
            'brands->Ifazone->denims'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[4]/a',
            'brands->Ifazone',
            '//*[@id="specific-ifazone"]/div[4]/div[4]/span/h4',
            'brands->Ifazone->basic tees'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[4]/a',
            'brands->Ifazone',
            '//*[@id="specific-ifazone"]/div[4]/div[5]/span/h4',
            'brands->Ifazone->socks'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[4]/a',
            'brands->Ifazone',
            '//*[@id="specific-ifazone"]/div[4]/div[6]/span/h4',
            'brands->Ifazone->'
        );

        // ------------------------------------------ Earthy Scent ------------------------------------------
        //await console.log('\n**********Earthy Scent**********\n');
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[5]/a',
            'brands->Earthy Scent',
            '//*[@id="specific-earthlyscent"]/div[3]/div[1]/span/div/span',
            'brands->Earthy Scent->women'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[5]/a',
            'brands->Earthy Scent',
            '//*[@id="specific-earthlyscent"]/div[3]/div[2]/span/div/span',
            'brands->Earthy Scent->men'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[5]/a',
            'brands->Earthy Scent',
            '//*[@id="specific-earthlyscent"]/div[4]/div[1]/span/h4',
            'brands->Earthy Scent->men\'s kurta'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[5]/a',
            'brands->Earthy Scent',
            '//*[@id="specific-earthlyscent"]/div[4]/div[2]/span/h4',
            'brands->Earthy Scent->women\'s kurta'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[5]/a',
            'brands->Earthy Scent',
            '//*[@id="specific-earthlyscent"]/div[4]/div[3]/span/h4',
            'brands->Earthy Scent->sarees'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[5]/a',
            'brands->Earthy Scent',
            '//*[@id="specific-earthlyscent"]/div[4]/div[4]/span/h4',
            'brands->Earthy Scent->jewellery'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[5]/a',
            'brands->Earthy Scent',
            '//*[@id="specific-earthlyscent"]/div[4]/div[5]/span/h4',
            'brands->Earthy Scent->footwear'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[5]/a',
            'brands->Earthy Scent',
            '//*[@id="specific-earthlyscent"]/div[4]/div[6]/span/h4',
            'brands->Earthy Scent->modi jacket'
        );

        // ------------------------------------------ Solasta ------------------------------------------
        //await console.log('\n**********Solasta**********\n');
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[6]/a',
            'brands->Solasta',
            '//*[@id="specific-solasta"]/div[3]/div[1]/span/div/span',
            'brands->Solasta->men'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[6]/a',
            'brands->Solasta',
            '//*[@id="specific-solasta"]/div[3]/div[2]/span/div/span',
            'brands->Solasta->women'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[6]/a',
            'brands->Solasta',
            '//*[@id="specific-solasta"]/div[4]/div[1]/span/h4',
            'brands->Solasta->formal shoes'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[6]/a',
            'brands->Solasta',
            '//*[@id="specific-solasta"]/div[4]/div[2]/span/h4',
            'brands->Solasta->sandals'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[6]/a',
            'brands->Solasta',
            '//*[@id="specific-solasta"]/div[4]/div[3]/span/h4',
            'brands->Solasta->belly'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[6]/a',
            'brands->Solasta',
            '//*[@id="specific-solasta"]/div[4]/div[4]/span/h4',
            'brands->Solasta->sneakers'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[6]/a',
            'brands->Solasta',
            '//*[@id="specific-solasta"]/div[4]/div[5]/span/h4',
            'brands->Solasta->espadrilles'
        );
        await brands(
            '//*[@id="topheader"]/div[1]/header/div/div/div/div[1]/ul/li[6]/a',
            'brands->Solasta',
            '//*[@id="specific-solasta"]/div[4]/div[6]/span/h4',
            'brands->Solasta->flats'
        );
        check.all_landing_pages='Loading correctly';
        console.log('\t\t\t\t\t\t+-----------------------------+\n\t\t\t\t\t\t|No product found in '+no_products+' pages.|\n\t\t\t\t\t\t+-----------------------------+');
        

        //below code will check whether signin is working or not
        
        
        var button = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="topheader"]/div[1]/header/nav/div/div[1]/span/div[2]/div/div/div[1]/span/span')),
            60000
        ).then();
        await button.click();//clicked on sign in button
        var button = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="topheader"]/div[1]/header/nav/div/div[1]/span/div[2]/div/div/div[2]/div/div[1]/div[1]/button')),
            60000
        ).then();
        await button.click();//clicked on sign in with asort
        await driver.getAllWindowHandles().then((windowHandles) => {
            driver.switchTo().window(windowHandles[1]);
        });//switched to signin window
        var button = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="signinWindow"]/div/form/div/div[2]/div/div[2]/div/input')),
            60000
        );
        await button.click();//clicked on the username field
        await button.sendKeys('297184');//entering username '297184'

        var button = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="signinWindow"]/div/form/div/div[2]/div/div[3]/div/input')),
            60000
        );
        await button.click();//clicked on the password field
        await button.sendKeys('1293');//entering password '1293'
    
        var button = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="signinWindow"]/div/form/div/div[2]/div/div[4]/input[1]')),
            60000
        );
        await button.click();//clicked on the signin button in identity.asort.com
    
        await driver.getAllWindowHandles().then((windowHandles) => {
            driver.switchTo().window(windowHandles[0]);
        });//switched to original window
        check.login='Working for Bhaskar Sarma';
        //await console.log('+++++++++++++++++++++++++++++++++++++++++ Signed in as Bhaskar Sarma +++++++++++++++++++++++++++++++++++++++++');

        for(var i=0;i<5;i++)
            await productDetails(i);
        //await console.log('\t\t\t\t\t\t+---------------------------------------+\n\t\t\t\t\t\t|\t'+itemsAddedToCart+' more items added to cart\t|\n\t\t\t\t\t\t+---------------------------------------+');

        //below code will check the tests realted to cart
        await driver.wait(until.elementLocated(By.xpath('//*[@id="topheader"]/div[1]/header/nav/div/a/img')),10000).click()
        await driver.wait(until.elementLocated(By.xpath('//*[@id="topheader"]/div[1]/header/nav/div/div[2]/div[2]/ul/li[4]/div/div[1]/a')),10000).click();//clicking on cart symbol
        try{
            var catch1 = await driver.wait(until.elementLocated(By.xpath('//*[@id="cart-drawer"]/div/div[1]/div[2]/div/div/div[1]/ul[1]/li[3]/span')),10000).getText();//checking for taxes visible
        }catch{}
        try{
            var catch2 = await driver.wait(until.elementLocated(By.xpath('//*[@id="cart-drawer"]/div/div[1]/div[2]/div/div/div[1]/ul[2]/li[2]/span')),10000).getText();//clicking on discount visible
        }catch{}
        try{
            var catch3 = await driver.wait(until.elementLocated(By.xpath('//*[@id="cart-drawer"]/div/div[1]/div[2]/div/div/div[1]/ul[2]/li[1]/span')),10000).getText();//clicking on discount visible
        }catch{}
        if(catch1=='Tax' || catch2=='Tax' || catch3=='Tax')
            check.tax_visible='Tax visible';
        if(catch1=='Discount' || catch2=='Discount' || catch3=='Discount');
            check.discount_visible='Discount visible';
        await driver.wait(until.elementLocated(By.xpath('//*[@id="cart-drawer"]/div/div[1]/div[2]/div/div/div[3]/button')),10000).click();//clicking on 'proceed for payment'
        try{
            shipping = await driver.wait(until.elementLocated(By.xpath('//*[@id="address-selection-help"]')),10000);//clicking on default shipping
        }catch{}
        if(shipping)
            check.shipping_visible='Shipping is Visible';
        try {
            await driver.wait(until.elementLocated(By.xpath('//*[@id="topheader"]/div[2]/main/span/div/div/div/div[2]/div[2]/div/div[2]/div[2]/div/button')),10000).click();//clicking on make payment
        }catch{}
        var isHDFC = await driver.wait(until.elementLocated(By.xpath('//*[@id="header"]/table/tbody/tr/td[1]/img')),10000);//checking for hdfc page
        if(isHDFC){
            check.hdfc_page='Loading Correctly';
        }
    } finally {
        await console.log('List of pages that has no products found\n'+no_products_url);
        await console.log(check);
        await console.log('**************************************************Test Ended**************************************************');
        await driver.quit();
        return;
    }
})();




/*
    For a drop down
        1. Select the field
        2. sendKeys(1);

    for size
        1. check if it has only one variant
            var findSize = findElement(for single size)
            if(!findSize)
                findSize = findElement(for multiple size)[1]
            findSize.click();
    after drop down and size, 
    add to cart
    click on cart icon
    click on proceed to checkout
    click on default shipping
    click on make payment
*/