<script>
	// @ts-nocheck
	import productPhoto from '$lib/images/product.png';
	import MultiStepForm from '$lib/components/MultiStepForm.svelte';
	import { selectedProduct } from '../../stores';

	import photoFirstSet from '$lib/images/set_1.png';
	import photoSecondSet from '$lib/images/set_2.png';
	import photoThirdSet from '$lib/images/set_3.png';

	export let data;

	/**
	 * @type {{ id: any; price: any; } | null}
	 */
	let product;

	selectedProduct.subscribe((value) => {
		product = value;
	});
	console.log(product);

	const images = {
		'1': photoFirstSet,
		'2': photoSecondSet,
		'3': photoThirdSet
	};

	$: selectedImage = product ? images[product.id] : '';
</script>

<div class="container pt-5 pb-5">
	<div class="py-5 text-center">
		<h2>Checkout form</h2>
		<p class="lead">
			Below is an example form built entirely with Bootstrap’s form controls. Each required form
			group has a validation state that can be triggered by attempting to submit the form without
			completing it.
		</p>
		<!-- TODO Progress bar -->
	</div>
	<div class="row g-5">
		<div class="col-md-5 col-lg-4 order-md-last">
			<h4 class="d-flex justify-content-between align-items-center mb-3">
				<span class="text-primary">Your cart</span>
				<span class="badge bg-primary rounded-pill">{product.count}</span>
			</h4>

			<div class="card p-4">
				<div class="row m-2">
					<div class="col">
						<img
							src={selectedImage}
							class="card-img-top"
							alt="product img"
							style="width: 100px; hight: 100px;"
						/>
					</div>
					<div class="col">
						<h6 class="card-title"><b>Card title</b></h6>
						<small
							>Some quick example text to build on the card title and make up the bulk of the card's
							content.</small
						>
					</div>
				</div>

				<div class="border-top p-4 m-2 justify-content-between">
					<div class="row">
						<div class="col text-end">
							<div class="h6 text-body-tertiary">
								<strong>฿<s>{Number(product.noDiscount) / Number(product.count)}</s></strong>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col text-start">รวม</div>
						<div class="col text-end">
							<div class="h6">
								<strong>฿{Number(product.price) / Number(product.count)}</strong>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col text-start">ปริมาณ</div>
						<div class="col text-end">
							<div class="h6"><strong>{product.count}</strong></div>
						</div>
					</div>
				</div>
				<!-- Total -->

				<div class="row border-top border-bottom p-4 m-2 justify-content-between">
					<div class="col text-start h5">ราคารวม</div>
					<div class="col text-end">
						<div class="h5"><strong>฿{product.price}</strong></div>
					</div>
					<div class="row text-body-tertiary">
						<div class="text-end">
							<div class="h6"><strong>฿<s>{product.noDiscount}</s></strong></div>
						</div>
					</div>
				</div>

				<div class="form-check p-4">
					<input class="form-check-input" type="checkbox" value="" id="CheckPolicy" />
					<label class="form-check-label" for="CheckPolicy">
						ฉันยอมรับ <a href="#">ข้อตกลงและเงื่อนไข</a> และ <a href="#">นโยบายความเป็นส่วนตัว</a>
					</label>
				</div>
				<button type="button" class="btn btn-primary btn-lg">Large button</button>
			</div>
		</div>
		<MultiStepForm {data} />
	</div>
</div>
