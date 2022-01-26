import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';

@Component({
  selector: 'app-shopping-grid',
  templateUrl: './shopping-grid.component.html',
  styleUrls: ['./shopping-grid.component.css'],
})
export class ShoppingGridComponent implements OnInit {
  products: Product[] = [];
  previousCategoryId?: number = 1;
  currentCategoryId?: number = 1;
  currentCategory?: ProductCategory[] = [];
  searchMode?: boolean = false;
  thePageNumber: number = 1;
  thePageSize: number = 6;
  theTotalElements: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  updatePageSize(e: Event) {
    const pageSize = e.target as HTMLSelectElement;
    this.thePageSize = pageSize.value as unknown as number;
    console.log(this.thePageSize);
    this.thePageNumber = 1;
    this.listProducts();
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
    window.scrollTo(0, 0);
  }

  handleSearchProducts() {
    const theKeyword: string | null =
      this.route.snapshot.paramMap.get('keyword');

    this.productService.searchProducts(theKeyword).subscribe((data) => {
      this.products = data;
      console.log(data);
    });
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      //@ts-ignore
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }

    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(
      `c = ${this.currentCategoryId}   p = ${this.previousCategoryId}`
    );

    this.productService
      .getProductListPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        this.currentCategoryId
      )
      .subscribe(this.processResult());
  }
  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }
}
